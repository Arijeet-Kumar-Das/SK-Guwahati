"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeUp } from "@/components/ui/motion";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQ[];
}

export default function FAQ({ faqs }: FAQProps) {
  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <FadeUp className="text-center mb-14">
          <p className="section-label">FAQ</p>
          <h2 className="section-title text-navy-900">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle mx-auto">
            Common questions about our septic tank cleaning services.
          </p>
        </FadeUp>

        {/* Accordion */}
        <FadeUp delay={0.1}>
          <div className="bg-slate-50 rounded-2xl ring-1 ring-slate-200/60 p-6 md:p-8">
            <Accordion type="single" collapsible className="space-y-1">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq._id}
                  value={faq._id}
                  className="border-b border-slate-200/80 last:border-b-0"
                >
                  <AccordionTrigger
                    className="text-left text-[15px] font-semibold text-navy-900 hover:text-brand-green-600 py-4 hover:no-underline transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-slate-500 text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}