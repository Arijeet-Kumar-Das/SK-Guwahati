"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  MapPin,
  Truck,
  Wrench,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ChevronRight,
  Zap,
  Info,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  options?: QuickOption[];
  isLead?: boolean;
}

interface QuickOption {
  label: string;
  action: string;
  icon?: React.ReactNode;
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

// ---------------------------------------------------------------------------
// Flow states
// ---------------------------------------------------------------------------

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
  | "vehicle_recommend_q2"
  | "vehicle_recommend_result";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TYPING_DELAY = 600;

const MAIN_MENU_OPTIONS: QuickOption[] = [
  { label: "Book Service", action: "book", icon: <Wrench size={14} /> },
  { label: "Service Info", action: "services", icon: <Info size={14} /> },
  { label: "Areas Covered", action: "areas", icon: <MapPin size={14} /> },
  { label: "Fleet Info", action: "fleet", icon: <Truck size={14} /> },
  { label: "Emergency", action: "emergency", icon: <AlertTriangle size={14} /> },
  { label: "Contact Us", action: "contact", icon: <Phone size={14} /> },
];

const PHONE_REGEX = /^(?:\+91|0)?[6-9]\d{9}$/;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _msgId = 0;
function msgId(): string {
  return `msg-${++_msgId}-${Date.now()}`;
}

function normalizePhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, "");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
  const [lead, setLead] = useState<LeadData>({ name: "", phone: "", service: "", location: "" });
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Focus input when chat opens or flow changes
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, flow]);

  // Show tooltip after 4 seconds if chat hasn't been opened
  useEffect(() => {
    if (hasOpened) return;
    const timer = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(timer);
  }, [hasOpened]);

  // Lock body scroll when chat is open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ----- Bot message helper (with typing delay) -----
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
    []
  );

  // ----- User message helper -----
  const userSay = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: msgId(), role: "user", text }]);
  }, []);

  // ----- Open chat and start conversation -----
  const handleOpen = useCallback(async () => {
    setOpen(true);
    setShowTooltip(false);
    setHasOpened(true);
    if (messages.length === 0) {
      await botSay(
        "Hello! 👋 Welcome to S.K Enterprise. I'm here to help you with septic tank cleaning and drain maintenance services.",
        undefined,
        300
      );
      await botSay(
        "How can I assist you today?",
        MAIN_MENU_OPTIONS,
        400
      );
      setFlow("main_menu");
    }
  }, [messages.length, botSay]);

  // ----- Back to main menu -----
  const goMainMenu = useCallback(async () => {
    await botSay("What else can I help you with?", MAIN_MENU_OPTIONS);
    setFlow("main_menu");
  }, [botSay]);

  // =========================================================================
  // ACTION HANDLER — drives the conversation flow
  // =========================================================================

  const handleAction = useCallback(
    async (action: string, userInput?: string) => {
      // ---------- MAIN MENU ACTIONS ----------
      if (action === "book") {
        userSay("I'd like to book a service");
        await botSay("Great! Let me help you book a service. What's your name?");
        setFlow("book_name");
        return;
      }

      if (action === "services") {
        userSay("Tell me about your services");
        const opts: QuickOption[] = services.slice(0, 6).map((s) => ({
          label: s.title,
          action: `service_${s._id}`,
          icon: <ChevronRight size={14} />,
        }));
        opts.push({ label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> });
        await botSay(
          "We offer a range of professional cleaning services. Which one would you like to know more about?",
          opts
        );
        setFlow("service_list");
        return;
      }

      if (action === "areas") {
        userSay("What areas do you cover?");
        const areaNames = areas.map((a) => a.name).join(", ");
        await botSay(
          `We serve across Guwahati and surrounding areas including:\n\n📍 ${areaNames}\n\nType a location name to check if we cover your area, or choose an option below.`,
          [
            { label: "Book Service", action: "book", icon: <Wrench size={14} /> },
            { label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> },
          ]
        );
        setFlow("area_check");
        return;
      }

      if (action === "fleet") {
        userSay("Tell me about your fleet");
        const opts: QuickOption[] = fleet.map((f) => ({
          label: `${f.name} (${f.capacity})`,
          action: `fleet_${f._id}`,
          icon: <Truck size={14} />,
        }));
        opts.push({
          label: "Help me choose",
          action: "vehicle_recommend",
          icon: <Zap size={14} />,
        });
        opts.push({ label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> });
        await botSay(
          "Our fleet includes specialized mechanized vehicles for every cleaning requirement. Select a vehicle to learn more, or let me recommend one for you.",
          opts
        );
        setFlow("fleet_list");
        return;
      }

      if (action === "emergency") {
        userSay("I need emergency help!");
        await botSay(
          `🚨 **Emergency Service Available 24/7**\n\nCall us immediately for urgent assistance:\n\n📞 **${phone}**\n\nOr reach us on WhatsApp for instant response.`,
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
            { label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> },
          ]
        );
        setFlow("emergency");
        return;
      }

      if (action === "contact") {
        userSay("I want to contact you");
        await botSay(
          `📞 **Phone:** ${phone}\n💬 **WhatsApp:** Available\n🕐 **Hours:** 24/7 All Days\n📍 **Office:** Solapara Road, Guwahati\n\nYou can also visit our Contact page for the full form and map.`,
          [
            { label: `Call ${phone}`, action: "call", icon: <Phone size={14} /> },
            { label: "WhatsApp", action: "whatsapp", icon: <MessageCircle size={14} /> },
            { label: "Book Service", action: "book", icon: <Wrench size={14} /> },
            { label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> },
          ]
        );
        setFlow("contact");
        return;
      }

      if (action === "menu") {
        await goMainMenu();
        return;
      }

      // ---------- EXTERNAL ACTIONS ----------
      if (action === "call") {
        window.open(`tel:${phone}`, "_self");
        return;
      }

      if (action === "whatsapp") {
        window.open(`https://wa.me/${whatsapp}`, "_blank");
        return;
      }

      // ---------- SERVICE DETAIL ----------
      if (action.startsWith("service_")) {
        const serviceId = action.replace("service_", "");
        const service = services.find((s) => s._id === serviceId);
        if (service) {
          userSay(service.title);
          await botSay(
            `**${service.title}**\n\n${service.description}\n\nWould you like to book this service?`,
            [
              { label: "Book This Service", action: `book_preset_${service.title}`, icon: <Wrench size={14} /> },
              { label: "Other Services", action: "services", icon: <Info size={14} /> },
              { label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> },
            ]
          );
          setFlow("service_detail");
        }
        return;
      }

      // Preset service booking
      if (action.startsWith("book_preset_")) {
        const serviceName = action.replace("book_preset_", "");
        setLead((prev) => ({ ...prev, service: serviceName }));
        userSay(`I'd like to book ${serviceName}`);
        await botSay("Sure! Let me get your details. What's your name?");
        setFlow("book_name");
        return;
      }

      // ---------- FLEET DETAIL ----------
      if (action.startsWith("fleet_")) {
        const fleetId = action.replace("fleet_", "");
        const vehicle = fleet.find((f) => f._id === fleetId);
        if (vehicle) {
          userSay(vehicle.name);
          await botSay(
            `🚛 **${vehicle.name}**\n📏 Capacity: ${vehicle.capacity}\n\n${vehicle.description}\n\nWant to book a service with this vehicle?`,
            [
              { label: "Book Service", action: "book", icon: <Wrench size={14} /> },
              { label: "Other Vehicles", action: "fleet", icon: <Truck size={14} /> },
              { label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> },
            ]
          );
          setFlow("fleet_detail");
        }
        return;
      }

      // ---------- VEHICLE RECOMMENDATION ----------
      if (action === "vehicle_recommend") {
        userSay("Help me choose a vehicle");
        await botSay(
          "Let me help you find the right vehicle. What type of property needs service?",
          [
            { label: "Residential (Home)", action: "vr_residential", icon: <ChevronRight size={14} /> },
            { label: "Commercial (Office/Shop)", action: "vr_commercial", icon: <ChevronRight size={14} /> },
            { label: "Industrial (Factory/Plant)", action: "vr_industrial", icon: <ChevronRight size={14} /> },
          ]
        );
        setFlow("vehicle_recommend_q1");
        return;
      }

      if (action.startsWith("vr_")) {
        const type = action.replace("vr_", "");
        userSay(type === "residential" ? "Residential" : type === "commercial" ? "Commercial" : "Industrial");

        let recommended: FleetItem | undefined;
        let reason = "";

        if (type === "residential") {
          recommended = fleet.find((f) => {
            const cap = parseInt(f.capacity);
            return cap <= 3000;
          }) || fleet[0];
          reason = "For residential properties, a compact vehicle works best for easy access through narrow lanes.";
        } else if (type === "commercial") {
          recommended = fleet.find((f) => {
            const cap = parseInt(f.capacity);
            return cap >= 3000 && cap <= 5000;
          }) || fleet[Math.min(1, fleet.length - 1)];
          reason = "For commercial properties, a mid-capacity vehicle offers the right balance of power and accessibility.";
        } else {
          recommended = fleet[fleet.length - 1] || fleet[0];
          reason = "For industrial operations, our largest capacity vehicle handles heavy-duty jobs efficiently.";
        }

        if (recommended) {
          await botSay(
            `Based on your needs, I recommend:\n\n🚛 **${recommended.name}**\n📏 Capacity: ${recommended.capacity}\n\n${reason}\n\nWould you like to book this?`,
            [
              { label: "Book Service", action: "book", icon: <Wrench size={14} /> },
              { label: "See All Vehicles", action: "fleet", icon: <Truck size={14} /> },
              { label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> },
            ]
          );
        }
        setFlow("vehicle_recommend_result");
        return;
      }
    },
    [services, areas, fleet, phone, whatsapp, botSay, userSay, goMainMenu]
  );

  // =========================================================================
  // TEXT INPUT HANDLER — handles free-text input based on current flow
  // =========================================================================

  const handleTextSubmit = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setInputValue("");

      // --- BOOKING FLOW ---
      if (flow === "book_name") {
        userSay(trimmed);
        setLead((prev) => ({ ...prev, name: trimmed }));
        await botSay(`Nice to meet you, ${trimmed}! What's your phone number?`);
        setFlow("book_phone");
        return;
      }

      if (flow === "book_phone") {
        userSay(trimmed);
        const cleaned = normalizePhone(trimmed);
        if (!PHONE_REGEX.test(cleaned)) {
          await botSay(
            "That doesn't look like a valid phone number. Please enter a 10-digit Indian mobile number (e.g., 9864074129)."
          );
          return; // stay in book_phone
        }
        setLead((prev) => ({ ...prev, phone: cleaned }));

        if (lead.service) {
          // Service already preset
          await botSay(`What's your address or location in Guwahati?`);
          setFlow("book_location");
        } else {
          const serviceOpts: QuickOption[] = services.slice(0, 5).map((s) => ({
            label: s.title,
            action: `select_service_${s.title}`,
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
        await botSay("What's your address or location in Guwahati?");
        setFlow("book_location");
        return;
      }

      if (flow === "book_location") {
        userSay(trimmed);
        setLead((prev) => {
          const updated = { ...prev, location: trimmed };

          // Show summary async
          setTimeout(async () => {
            const summary =
              `✅ **Enquiry Summary**\n\n` +
              `👤 Name: ${updated.name}\n` +
              `📞 Phone: ${updated.phone}\n` +
              `🔧 Service: ${updated.service}\n` +
              `📍 Location: ${updated.location}\n\n` +
              `Our team will contact you within 30 minutes. For immediate assistance, call or WhatsApp us.`;

            await botSay(summary, [
              { label: `Call ${phone}`, action: "call", icon: <Phone size={14} /> },
              { label: "WhatsApp", action: "whatsapp", icon: <MessageCircle size={14} /> },
              { label: "Start Over", action: "menu", icon: <ArrowLeft size={14} /> },
            ]);
            setFlow("book_summary");
          }, 100);

          return updated;
        });
        return;
      }

      // --- AREA CHECK ---
      if (flow === "area_check") {
        userSay(trimmed);
        const lower = trimmed.toLowerCase();
        const found = areas.some(
          (a) =>
            a.name.toLowerCase().includes(lower) ||
            lower.includes(a.name.toLowerCase())
        );

        if (found) {
          await botSay(
            `✅ **Great news!** We serve **${trimmed}** and surrounding areas. Would you like to book a service?`,
            [
              { label: "Book Service", action: "book", icon: <Wrench size={14} /> },
              { label: "Check Another Area", action: "areas", icon: <MapPin size={14} /> },
              { label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> },
            ]
          );
        } else {
          await botSay(
            `We may still serve **${trimmed}** — our coverage is expanding. Call us to confirm, or try a nearby area name.`,
            [
              { label: `Call ${phone}`, action: "call", icon: <Phone size={14} /> },
              { label: "Check Another Area", action: "areas", icon: <MapPin size={14} /> },
              { label: "← Back to Menu", action: "menu", icon: <ArrowLeft size={14} /> },
            ]
          );
        }
        setFlow("area_result");
        return;
      }

      // --- DEFAULT: treat as a general query ---
      userSay(trimmed);
      await botSay(
        "I can help you best through our guided options. Please choose from the menu below.",
        MAIN_MENU_OPTIONS
      );
      setFlow("main_menu");
    },
    [flow, lead, services, areas, phone, botSay, userSay]
  );

  // Handle quick option that selects a service during booking
  const handleQuickAction = useCallback(
    async (action: string) => {
      if (action.startsWith("select_service_")) {
        const serviceName = action.replace("select_service_", "");
        userSay(serviceName);
        setLead((prev) => ({ ...prev, service: serviceName }));
        await botSay("What's your address or location in Guwahati?");
        setFlow("book_location");
        return;
      }
      handleAction(action);
    },
    [handleAction, botSay, userSay]
  );

  // ----- Form submit -----
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleTextSubmit(inputValue);
  };

  // ----- Determine if text input should be shown -----
  const showInput = [
    "book_name",
    "book_phone",
    "book_service",
    "book_location",
    "area_check",
  ].includes(flow);

  const inputPlaceholder =
    flow === "book_name"
      ? "Enter your name…"
      : flow === "book_phone"
        ? "Enter phone number…"
        : flow === "book_service"
          ? "Type service name…"
          : flow === "book_location"
            ? "Enter your address…"
            : flow === "area_check"
              ? "Type a location name…"
              : "Type a message…";

  // =========================================================================
  // RENDER
  // =========================================================================

  return (
    <>
      {/* ---- Floating Chat Button ---- */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full right-0 mb-3 whitespace-nowrap bg-navy-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl"
                >
                  Need help? Chat with us! 💬
                  <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-navy-900" />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleOpen}
              className="w-14 h-14 bg-brand-green-600 hover:bg-brand-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group relative"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-110" />
              {/* Notification dot */}
              {!hasOpened && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Chat Panel ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] h-full sm:h-[600px] sm:max-h-[85vh] flex flex-col bg-white/95 backdrop-blur-xl sm:rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden"
          >
            {/* ----- Header ----- */}
            <div className="flex items-center justify-between px-5 py-4 bg-navy-950 text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-green-600 flex items-center justify-center text-xs font-bold">
                  SK
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    S.K Enterprise
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-navy-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green-400 animate-pulse" />
                    Online · Typically replies instantly
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* ----- Messages ----- */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
              style={{ overscrollBehavior: "contain" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-brand-green-600 text-white rounded-2xl rounded-br-md px-4 py-3"
                        : "bg-slate-100 text-slate-800 rounded-2xl rounded-bl-md px-4 py-3"
                    }`}
                  >
                    {/* Render text with markdown-like bold and line breaks */}
                    <div className="text-[13.5px] leading-relaxed whitespace-pre-line">
                      {msg.text.split(/(\*\*[^*]+\*\*)/).map((segment, i) => {
                        if (segment.startsWith("**") && segment.endsWith("**")) {
                          return (
                            <strong key={i} className="font-bold">
                              {segment.slice(2, -2)}
                            </strong>
                          );
                        }
                        return <span key={i}>{segment}</span>;
                      })}
                    </div>

                    {/* Quick action buttons */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.action}
                            onClick={() => handleQuickAction(opt.action)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-navy-900 text-xs font-medium rounded-lg border border-slate-200 hover:border-brand-green-400 transition-all duration-200 shadow-sm hover:shadow"
                          >
                            {opt.icon}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ----- Input Area ----- */}
            {showInput ? (
              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2 px-4 py-3 border-t border-slate-100 bg-white flex-shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={inputPlaceholder}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent transition-all"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-brand-green-600 hover:bg-brand-green-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white disabled:text-slate-400 rounded-xl flex items-center justify-center transition-all duration-200"
                >
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <div className="px-4 py-3 border-t border-slate-100 bg-white flex-shrink-0">
                <p className="text-[11px] text-slate-400 text-center">
                  Choose an option above · Powered by S.K Enterprise
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
