"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Truck,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  options?: QuickOption[];
}

interface QuickOption {
  label: string;
  action: string;
  icon?: ReactNode;
}

interface LeadData {
  name: string;
  phone: string;
  service: string;
  location: string;
}

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
}

interface AreaItem {
  _id: string;
  name: string;
}

interface FleetItem {
  _id: string;
  name: string;
  capacity: string;
  description: string;
}

interface ChatBotProps {
  services: ServiceItem[];
  areas: AreaItem[];
  fleet: FleetItem[];
  phone: string;
  whatsapp: string;
}

type FlowState =
  | "idle"
  | "main_menu"
  | "book_name"
  | "book_phone"
  | "book_service"
  | "book_location"
  | "book_summary"
  | "service_list"
  | "service_detail"
  | "area_check"
  | "area_result"
  | "fleet_list"
  | "fleet_detail"
  | "emergency"
  | "contact"
  | "vehicle_recommend_q1"
  | "vehicle_recommend_result";

const TYPING_DELAY = 450;
const PHONE_REGEX = /^(?:\+91|0)?[6-9]\d{9}$/;

/** WhatsApp booking number — chatbot enquiries go here */
const WHATSAPP_BOOKING_NUMBER = "918005429901";

const MAIN_MENU_OPTIONS: QuickOption[] = [
  { label: "Book Service", action: "book", icon: <Wrench size={14} /> },
  { label: "Service Info", action: "services", icon: <Info size={14} /> },
  { label: "Areas Covered", action: "areas", icon: <MapPin size={14} /> },
  { label: "Fleet Info", action: "fleet", icon: <Truck size={14} /> },
  {
    label: "Emergency",
    action: "emergency",
    icon: <AlertTriangle size={14} />,
  },
  { label: "Contact Us", action: "contact", icon: <Phone size={14} /> },
];

let messageCounter = 0;

function msgId(): string {
  messageCounter += 1;
  return `msg-${messageCounter}-${Date.now()}`;
}

function normalizePhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, "");
}

function capacityNumber(raw: string): number {
  return Number.parseInt(raw.replace(/[^\d]/g, ""), 10) || 0;
}

function backOption(): QuickOption {
  return {
    label: "Back to Menu",
    action: "menu",
    icon: <ArrowLeft size={14} />,
  };
}

function buildBookingWhatsAppUrl(lead: LeadData): string {
  const message = [
    "🔧 *Service Booking — S.K Enterprise*",
    "",
    `*Name:* ${lead.name}`,
    `*Phone:* ${lead.phone}`,
    `*Service:* ${lead.service}`,
    `*Location:* ${lead.location}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_BOOKING_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatSummary(lead: LeadData): string {
  return [
    "**Enquiry Summary**",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Service: ${lead.service}`,
    `Location: ${lead.location}`,
    "",
    "Tap **Send via WhatsApp** below to submit your booking request instantly.",
  ].join("\n");
}

export default function ChatBot({
  services,
  areas,
  fleet,
  phone,
  whatsapp,
}: ChatBotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [flow, setFlow] = useState<FlowState>("idle");
  const [inputValue, setInputValue] = useState("");
  const [typing, setTyping] = useState(false);
  const [lead, setLead] = useState<LeadData>({
    name: "",
    phone: "",
    service: "",
    location: "",
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, flow]);

  useEffect(() => {
    if (hasOpened) return;
    const timer = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(timer);
  }, [hasOpened]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    document.body.style.overflow = open && isMobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const botSay = useCallback(
    (text: string, options?: QuickOption[], delay = TYPING_DELAY) => {
      setTyping(true);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: msgId(), role: "bot", text, options },
          ]);
          resolve();
        }, delay);
      });
    },
    [],
  );

  const userSay = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: msgId(), role: "user", text }]);
  }, []);

  const goMainMenu = useCallback(async () => {
    await botSay("What else can I help you with?", MAIN_MENU_OPTIONS);
    setFlow("main_menu");
  }, [botSay]);

  const handleOpen = useCallback(async () => {
    setOpen(true);
    setShowTooltip(false);
    setHasOpened(true);

    if (messages.length === 0) {
      await botSay(
        "Hello. Welcome to S.K Enterprise. I can help with booking, service details, fleet information, and urgent support.",
        undefined,
        250,
      );
      await botSay("How can I assist you today?", MAIN_MENU_OPTIONS, 350);
      setFlow("main_menu");
    }
  }, [messages.length, botSay]);

  const handleAction = useCallback(
    async (action: string) => {
      if (action === "book") {
        userSay("I'd like to book a service");
        await botSay("Great. What is your name?");
        setFlow("book_name");
        return;
      }

      if (action === "services") {
        userSay("Tell me about your services");
        const opts: QuickOption[] = services.slice(0, 6).map((service) => ({
          label: service.title,
          action: `service_${service._id}`,
          icon: <ChevronRight size={14} />,
        }));
        opts.push(backOption());
        await botSay(
          "We provide mechanized sanitation and cleaning services. Choose a service to learn more.",
          opts,
        );
        setFlow("service_list");
        return;
      }

      if (action === "areas") {
        userSay("What areas do you cover?");
        const areaNames = areas.map((area) => area.name).join(", ");
        await botSay(
          `We serve Guwahati and surrounding areas including:\n\n${areaNames}\n\nType a location name to check coverage.`,
          [
            {
              label: "Book Service",
              action: "book",
              icon: <Wrench size={14} />,
            },
            backOption(),
          ],
        );
        setFlow("area_check");
        return;
      }

      if (action === "fleet") {
        userSay("Tell me about your fleet");
        const opts: QuickOption[] = fleet.map((vehicle) => ({
          label: `${vehicle.name} (${vehicle.capacity})`,
          action: `fleet_${vehicle._id}`,
          icon: <Truck size={14} />,
        }));
        opts.push({
          label: "Help me choose",
          action: "vehicle_recommend",
          icon: <Zap size={14} />,
        });
        opts.push(backOption());
        await botSay(
          "Our fleet includes mechanized vehicles for different cleaning requirements. Select a vehicle or ask for a recommendation.",
          opts,
        );
        setFlow("fleet_list");
        return;
      }

      if (action === "emergency") {
        userSay("I need emergency help");
        await botSay(
          `**Emergency Service Available 24/7**\n\nCall us immediately at **${phone}** or message us on WhatsApp for urgent support.`,
          [
            {
              label: `Call ${phone}`,
              action: "call",
              icon: <Phone size={14} />,
            },
            {
              label: "WhatsApp",
              action: "whatsapp",
              icon: <MessageCircle size={14} />,
            },
            backOption(),
          ],
        );
        setFlow("emergency");
        return;
      }

      if (action === "contact") {
        userSay("I want to contact you");
        await botSay(
          `**Phone:** ${phone}\n**WhatsApp:** Available\n**Hours:** 24/7 all days\n**Office:** Solapara Road, Guwahati\n\nYou can also use the Contact page for the full enquiry form and map.`,
          [
            {
              label: `Call ${phone}`,
              action: "call",
              icon: <Phone size={14} />,
            },
            {
              label: "WhatsApp",
              action: "whatsapp",
              icon: <MessageCircle size={14} />,
            },
            {
              label: "Book Service",
              action: "book",
              icon: <Wrench size={14} />,
            },
            backOption(),
          ],
        );
        setFlow("contact");
        return;
      }

      if (action === "menu") {
        await goMainMenu();
        return;
      }

      if (action === "call") {
        window.open(`tel:${phone}`, "_self");
        return;
      }

      if (action === "whatsapp") {
        window.open(`https://wa.me/${whatsapp}`, "_blank");
        return;
      }

      if (action === "send_booking_whatsapp") {
        const bookingUrl = buildBookingWhatsAppUrl(lead);
        window.open(bookingUrl, "_blank");
        userSay("Sending booking via WhatsApp");
        await botSay(
          "Your booking request has been opened in WhatsApp. Our team will confirm your service shortly.",
          [
            {
              label: `Call ${phone}`,
              action: "call",
              icon: <Phone size={14} />,
            },
            {
              label: "Start Over",
              action: "menu",
              icon: <ArrowLeft size={14} />,
            },
          ],
        );
        return;
      }

      if (action.startsWith("service_")) {
        const serviceId = action.replace("service_", "");
        const service = services.find((item) => item._id === serviceId);

        if (service) {
          userSay(service.title);
          await botSay(
            `**${service.title}**\n\n${service.description}\n\nWould you like to book this service?`,
            [
              {
                label: "Book This Service",
                action: `book_preset_${service.title}`,
                icon: <Wrench size={14} />,
              },
              {
                label: "Other Services",
                action: "services",
                icon: <Info size={14} />,
              },
              backOption(),
            ],
          );
          setFlow("service_detail");
        }
        return;
      }

      if (action.startsWith("book_preset_")) {
        const serviceName = action.replace("book_preset_", "");
        setLead((prev) => ({ ...prev, service: serviceName }));
        userSay(`I'd like to book ${serviceName}`);
        await botSay("Sure. What is your name?");
        setFlow("book_name");
        return;
      }

      if (action.startsWith("fleet_")) {
        const fleetId = action.replace("fleet_", "");
        const vehicle = fleet.find((item) => item._id === fleetId);

        if (vehicle) {
          userSay(vehicle.name);
          await botSay(
            `**${vehicle.name}**\nCapacity: ${vehicle.capacity}\n\n${vehicle.description}\n\nWant to book a service with this vehicle?`,
            [
              {
                label: "Book Service",
                action: "book",
                icon: <Wrench size={14} />,
              },
              {
                label: "Other Vehicles",
                action: "fleet",
                icon: <Truck size={14} />,
              },
              backOption(),
            ],
          );
          setFlow("fleet_detail");
        }
        return;
      }

      if (action === "vehicle_recommend") {
        userSay("Help me choose a vehicle");
        await botSay("What type of property needs service?", [
          {
            label: "Residential",
            action: "vr_residential",
            icon: <ChevronRight size={14} />,
          },
          {
            label: "Commercial",
            action: "vr_commercial",
            icon: <ChevronRight size={14} />,
          },
          {
            label: "Industrial",
            action: "vr_industrial",
            icon: <ChevronRight size={14} />,
          },
        ]);
        setFlow("vehicle_recommend_q1");
        return;
      }

      if (action.startsWith("vr_")) {
        const type = action.replace("vr_", "");
        userSay(
          type === "residential"
            ? "Residential"
            : type === "commercial"
              ? "Commercial"
              : "Industrial",
        );

        let recommended: FleetItem | undefined;
        let reason = "";

        if (type === "residential") {
          recommended =
            fleet.find((item) => capacityNumber(item.capacity) <= 3000) ||
            fleet[0];
          reason =
            "For residential properties, a compact vehicle usually works best for lane access and smaller tanks.";
        } else if (type === "commercial") {
          recommended =
            fleet.find((item) => {
              const capacity = capacityNumber(item.capacity);
              return capacity >= 3000 && capacity <= 5000;
            }) || fleet[Math.min(1, fleet.length - 1)];
          reason =
            "For commercial sites, a mid-capacity vehicle offers a practical balance of power and access.";
        } else {
          recommended = fleet[fleet.length - 1] || fleet[0];
          reason =
            "For industrial operations, the largest capacity vehicle is usually the right starting point.";
        }

        if (recommended) {
          await botSay(
            `Based on your needs, I recommend:\n\n**${recommended.name}**\nCapacity: ${recommended.capacity}\n\n${reason}\n\nWould you like to book this?`,
            [
              {
                label: "Book Service",
                action: "book",
                icon: <Wrench size={14} />,
              },
              {
                label: "See All Vehicles",
                action: "fleet",
                icon: <Truck size={14} />,
              },
              backOption(),
            ],
          );
        }
        setFlow("vehicle_recommend_result");
      }
    },
    [
      areas,
      botSay,
      fleet,
      goMainMenu,
      lead,
      phone,
      services,
      userSay,
      whatsapp,
    ],
  );

  const handleTextSubmit = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setInputValue("");

      if (flow === "book_name") {
        userSay(trimmed);
        setLead((prev) => ({ ...prev, name: trimmed }));
        await botSay(
          `Nice to meet you, ${trimmed}. What is your phone number?`,
        );
        setFlow("book_phone");
        return;
      }

      if (flow === "book_phone") {
        userSay(trimmed);
        const cleaned = normalizePhone(trimmed);
        if (!PHONE_REGEX.test(cleaned)) {
          await botSay("Please enter a valid 10-digit Indian mobile number");
          return;
        }

        const nextLead = { ...lead, phone: cleaned };
        setLead(nextLead);

        if (lead.service) {
          await botSay("What is your address or location in Guwahati?");
          setFlow("book_location");
        } else {
          const serviceOpts: QuickOption[] = services
            .slice(0, 6)
            .map((service) => ({
              label: service.title,
              action: `select_service_${service.title}`,
              icon: <ChevronRight size={14} />,
            }));
          await botSay("Which service do you need?", serviceOpts);
          setFlow("book_service");
        }
        return;
      }

      if (flow === "book_service") {
        userSay(trimmed);
        setLead((prev) => ({ ...prev, service: trimmed }));
        await botSay("What is your address or location in Guwahati?");
        setFlow("book_location");
        return;
      }

      if (flow === "book_location") {
        userSay(trimmed);
        const updated = { ...lead, location: trimmed };
        setLead(updated);
        await botSay(formatSummary(updated), [
          {
            label: "Send via WhatsApp",
            action: `send_booking_whatsapp`,
            icon: <MessageCircle size={14} />,
          },
          { label: `Call ${phone}`, action: "call", icon: <Phone size={14} /> },
          {
            label: "Start Over",
            action: "menu",
            icon: <ArrowLeft size={14} />,
          },
        ]);
        setFlow("book_summary");
        return;
      }

      if (flow === "area_check") {
        userSay(trimmed);
        const lower = trimmed.toLowerCase();
        const found = areas.some(
          (area) =>
            area.name.toLowerCase().includes(lower) ||
            lower.includes(area.name.toLowerCase()),
        );

        if (found) {
          await botSay(
            `Good news. We serve **${trimmed}** and nearby areas. Would you like to book a service?`,
            [
              {
                label: "Book Service",
                action: "book",
                icon: <Wrench size={14} />,
              },
              {
                label: "Check Another Area",
                action: "areas",
                icon: <MapPin size={14} />,
              },
              backOption(),
            ],
          );
        } else {
          await botSay(
            `We may still serve **${trimmed}** because coverage is expanding. Call us to confirm, or try a nearby area name.`,
            [
              {
                label: `Call ${phone}`,
                action: "call",
                icon: <Phone size={14} />,
              },
              {
                label: "Check Another Area",
                action: "areas",
                icon: <MapPin size={14} />,
              },
              backOption(),
            ],
          );
        }
        setFlow("area_result");
        return;
      }

      userSay(trimmed);
      await botSay(
        "I can help best through the guided options below.",
        MAIN_MENU_OPTIONS,
      );
      setFlow("main_menu");
    },
    [areas, botSay, flow, lead, phone, services, userSay],
  );

  const handleQuickAction = useCallback(
    async (action: string) => {
      if (action.startsWith("select_service_")) {
        const serviceName = action.replace("select_service_", "");
        userSay(serviceName);
        setLead((prev) => ({ ...prev, service: serviceName }));
        await botSay("What is your address or location in Guwahati?");
        setFlow("book_location");
        return;
      }

      handleAction(action);
    },
    [botSay, handleAction, userSay],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleTextSubmit(inputValue);
  };

  const showInput = [
    "book_name",
    "book_phone",
    "book_service",
    "book_location",
    "area_check",
  ].includes(flow);

  const inputPlaceholder =
    flow === "book_name"
      ? "Enter your name"
      : flow === "book_phone"
        ? "Enter phone number"
        : flow === "book_service"
          ? "Type service name"
          : flow === "book_location"
            ? "Enter your address"
            : flow === "area_check"
              ? "Type a location name"
              : "Type a message";

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute bottom-full right-0 mb-3 w-max rounded-lg bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg"
                >
                  Need service help?
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleOpen}
              className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-green-600 text-white shadow-lg shadow-brand-green-600/20 transition-all duration-200 hover:bg-brand-green-700 hover:shadow-brand-green-600/25"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 z-[52] flex h-full w-full flex-col overflow-hidden border border-slate-200 bg-white shadow-2xl sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[85vh] sm:w-[400px] sm:rounded-lg"
          >
            <div className="flex shrink-0 items-center justify-between bg-navy-950 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green-600 text-xs font-extrabold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  SK
                </div>
                <div>
                  <div
                    className="text-sm font-extrabold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    S.K Enterprise
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-navy-300">
                    <span className="h-1.5 w-1.5 rounded-sm bg-brand-green-400" />
                    Online - replies quickly
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scroll-smooth"
              style={{ overscrollBehavior: "contain" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] rounded-lg px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-brand-green-600 text-white"
                        : "bg-navy-50 text-slate-800"
                    }`}
                  >
                    <div className="whitespace-pre-line text-[13.5px] leading-6">
                      {msg.text
                        .split(/(\*\*[^*]+\*\*)/)
                        .map((segment, index) => {
                          if (
                            segment.startsWith("**") &&
                            segment.endsWith("**")
                          ) {
                            return (
                              <strong key={index} className="font-bold">
                                {segment.slice(2, -2)}
                              </strong>
                            );
                          }
                          return <span key={index}>{segment}</span>;
                        })}
                    </div>

                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {msg.options.map((option) => (
                          <button
                            key={option.action}
                            onClick={() => handleQuickAction(option.action)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 shadow-sm transition-colors hover:border-brand-green-600/40 hover:bg-navy-50"
                          >
                            {option.icon}
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-lg bg-navy-50 px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-sm bg-slate-400 animate-bounce" />
                      <span
                        className="h-2 w-2 rounded-sm bg-slate-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-2 w-2 rounded-sm bg-slate-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {showInput ? (
              <form
                onSubmit={onSubmit}
                className="flex shrink-0 items-center gap-2 border-t border-slate-200 bg-white px-4 py-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={inputPlaceholder}
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 transition-all focus:border-brand-green-600 focus:outline-none focus:ring-3 focus:ring-brand-green-600/15"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green-600 text-white transition-colors hover:bg-brand-green-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3">
                <p className="text-center text-[11px] font-medium text-slate-400">
                  Select an option to continue.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
