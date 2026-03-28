export const guidesMeta = [
  { id: 1,  title: "What Is an LLM?",       subtitle: "How large language models actually work",       cat: "Foundations",   color: "#1565C0", icon: "\u{1F9E0}" },
  { id: 2,  title: "Tokens & Tokenization",  subtitle: "The atoms of AI language",                     cat: "Foundations",   color: "#1565C0", icon: "\u{1F524}" },
  { id: 3,  title: "Context Windows",        subtitle: "What the model can see \u2014 and what it forgets", cat: "Foundations",   color: "#1565C0", icon: "\u{1F4D0}" },
  { id: 4,  title: "Temperature & Sampling",  subtitle: "Controlling randomness and creativity",        cat: "Foundations",   color: "#1565C0", icon: "\u{1F3B2}" },
  { id: 5,  title: "How Models \u201CThink\u201D",       subtitle: "Attention, patterns, and probabilities",      cat: "Foundations",   color: "#1565C0", icon: "\u26A1" },

  { id: 6,  title: "Clear Instructions",     subtitle: "Say what you mean, get what you want",          cat: "Prompt Craft",  color: "#6A1B9A", icon: "\u{1F3AF}" },
  { id: 7,  title: "Few-Shot Examples",       subtitle: "Teaching by showing",                          cat: "Prompt Craft",  color: "#6A1B9A", icon: "\u{1F4CB}" },
  { id: 8,  title: "System Prompts",          subtitle: "Setting the stage before the conversation",    cat: "Prompt Craft",  color: "#6A1B9A", icon: "\u{1F3D7}\uFE0F" },
  { id: 9,  title: "Chain of Thought",        subtitle: "Making models reason step by step",            cat: "Prompt Craft",  color: "#6A1B9A", icon: "\u{1F517}" },
  { id: 10, title: "Structured Output",       subtitle: "Getting JSON, tables, and formatted results",  cat: "Prompt Craft",  color: "#6A1B9A", icon: "\u{1F4CA}" },
  { id: 11, title: "Prompt Patterns",         subtitle: "Reusable templates for common tasks",          cat: "Prompt Craft",  color: "#6A1B9A", icon: "\u{1F9E9}" },
  { id: 12, title: "Prompt Craft Quiz",       subtitle: "Test your prompt engineering skills",           cat: "Prompt Craft",  color: "#6A1B9A", icon: "\u{1F3C6}" },

  { id: 13, title: "Tool Use",               subtitle: "When models reach beyond text",                 cat: "Agentic",       color: "#00695C", icon: "\u{1F527}" },
  { id: 14, title: "Agentic Loops",           subtitle: "Plan, act, observe, repeat",                   cat: "Agentic",       color: "#00695C", icon: "\u{1F504}" },
  { id: 15, title: "Multi-Step Reasoning",    subtitle: "Breaking big problems into small steps",        cat: "Agentic",       color: "#00695C", icon: "\u{1FA9C}" },
  { id: 16, title: "MCP & Protocols",         subtitle: "How agents talk to the outside world",          cat: "Agentic",       color: "#00695C", icon: "\u{1F50C}" },
  { id: 17, title: "Human in the Loop",       subtitle: "When to trust, when to verify",                cat: "Agentic",       color: "#00695C", icon: "\u{1F91D}" },
  { id: 18, title: "AI Coding Assistants",    subtitle: "How AI helps write, review, and debug code",   cat: "Agentic",       color: "#00695C", icon: "\u{1F4BB}" },
  { id: 19, title: "Orchestration",           subtitle: "Chaining AI calls into workflows",              cat: "Agentic",       color: "#00695C", icon: "\u{1F3AD}" },

  { id: 20, title: "Bias & Fairness",         subtitle: "How bias enters AI and what to watch for",     cat: "Ethics",        color: "#C62828", icon: "\u2696\uFE0F" },
  { id: 21, title: "Copyright & Ownership",   subtitle: "Who owns AI-generated content?",               cat: "Ethics",        color: "#C62828", icon: "\u{1F4DC}" },
  { id: 22, title: "Environmental Impact",    subtitle: "The carbon cost of training and inference",     cat: "Ethics",        color: "#C62828", icon: "\u{1F30D}" },
  { id: 23, title: "AI in Society",           subtitle: "Jobs, education, and the bigger picture",       cat: "Ethics",        color: "#C62828", icon: "\u{1F3DB}\uFE0F" },

  { id: 24, title: "Models & Trade-offs",     subtitle: "Choosing the right model for the job",          cat: "Practical",     color: "#E65100", icon: "\u{1F39B}\uFE0F" },
  { id: 25, title: "Final Quiz",              subtitle: "Test your overall AI knowledge",                cat: "Practical",     color: "#E65100", icon: "\u{1F9EA}" },
];

export const categories = ["Foundations", "Prompt Craft", "Agentic", "Ethics", "Practical"];

export const catColors = {
  Foundations:   "#1565C0",
  "Prompt Craft": "#6A1B9A",
  Agentic:       "#00695C",
  Ethics:        "#C62828",
  Practical:     "#E65100",
};
