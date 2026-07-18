import { useEffect, useRef, useState } from "react";
import { CONTACT_SUMMARY } from "@/lib/constants";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const QUICK_REPLIES = [
  "Our services",
  "Sourcing markets",
  "Contact details",
  "Get a quote",
];

const BOT_RESPONSES: Record<string, string> = {
  "our services":
    "We offer consultancy & advisory, global sourcing, engineering services, quality & inspection, site & installation, and transport & logistics.",
  "sourcing markets":
    "We source across China, Vietnam, India, and Turkey with on-the-ground teams for supplier qualification, audits, and delivery management.",
  "contact details": CONTACT_SUMMARY,
  "get a quote":
    "Submit your requirement on our Request Quotation page — you can attach drawings, specs, and reference files for a detailed commercial proposal.",
};

const WELCOME =
  "Hi! I'm the Orbigreen assistant. Ask about our services, sourcing markets, or how to get in touch.";

function getBotReply(input: string) {
  const normalized = input.trim().toLowerCase();

  for (const [key, reply] of Object.entries(BOT_RESPONSES)) {
    if (normalized.includes(key)) return reply;
  }

  if (normalized.includes("hello") || normalized.includes("hi")) {
    return "Hello! How can we help with your industrial sourcing needs today!";
  }

  if (normalized.includes("product")) {
    return "We source castings, machining, fabrication, pressure vessels, stamping parts, proprietary machines, fasteners, and transmission components.";
  }

  if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("quote")) {
    return BOT_RESPONSES["get a quote"];
  }

  return "I can help with services, sourcing markets, products, or contact info. Try a quick reply below or visit our contact section.";
}

let messageId = 0;

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: messageId++, role: "bot", text: WELCOME },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: messageId++, role: "user", text: trimmed },
      { id: messageId++, role: "bot", text: getBotReply(trimmed) },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-4 z-[120] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-[0_20px_60px_rgba(11,95,126,0.18)]"
          >
            <div className="gradient-border-cta flex items-center justify-between px-4 py-3.5">
              <div>
                <p className="text-[13px] lg:text-[14px] font-semibold text-white">Orbigreen Assistant</p>
                <p className="text-[10px] lg:text-[11px] text-white/75">Typically replies instantly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div ref={scrollRef} className="flex max-h-[320px] flex-col gap-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] lg:text-[14px] leading-relaxed ${
                    message.role === "bot"
                      ? "self-start rounded-bl-md bg-section text-primary"
                      : "self-end rounded-br-md bg-primary text-white"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-primary/8 px-4 py-3">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-primary/12 bg-section px-3 py-1.5 text-[11px] lg:text-[12px] font-medium text-primary/75 transition-colors hover:border-secondary/35 hover:text-primary"
                >
                  {reply}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-primary/8 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="min-w-0 flex-1 rounded-full border border-primary/12 bg-section px-3.5 py-2 text-[13px] lg:text-[14px] text-primary outline-none transition-colors placeholder:text-primary/35 focus:border-secondary"
              />
              <button
                type="submit"
                className="gradient-border-cta flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all hover:shadow-[0_0_20px_-4px_rgba(92,191,42,0.45)]"
                aria-label="Send message"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            <div className="border-t border-primary/8 px-4 py-2.5 text-center">
              <Link to="/quotation" className="text-[11px] lg:text-[12px] font-medium text-secondary transition-colors hover:text-primary">
                Contact our team →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="gradient-border-cta flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_40px_rgba(11,95,126,0.28)] transition-shadow hover:shadow-[0_16px_48px_rgba(92,191,42,0.35)]"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.96L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
