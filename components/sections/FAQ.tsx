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
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="bg-navy-50 py-16 lg:py-24"
    >
      <div className="section-container">
        <FadeUp className="mx-auto mb-12 max-w-3xl text-center">
          <p className="section-label justify-center">FAQ</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto">
            Common questions about septic tank cleaning services in Guwahati.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="enterprise-card mx-auto max-w-3xl p-5 md:p-7">
            <Accordion type="single" collapsible className="space-y-1">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq._id}
                  value={faq._id}
                  className="border-b border-slate-200 last:border-b-0"
                >
                  <AccordionTrigger
                    className="py-4 text-left text-[15px] font-bold text-navy-950 transition-colors hover:text-brand-green-700 hover:no-underline"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="pb-4 text-sm leading-7 text-slate-600">
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
