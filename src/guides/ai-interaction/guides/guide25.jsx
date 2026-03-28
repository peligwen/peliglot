import { QuizSection } from '../../../components/templates/QuizSection';

const items = [
  {
    question: "What is a token in the context of LLMs?",
    answer: "A chunk of text (word or word-piece) that the model processes",
    alt1: "A cryptocurrency used to pay for AI",
    alt2: "A security credential for API access",
    alt3: "A unit of computer memory",
  },
  {
    question: "What happens when a conversation exceeds the context window?",
    answer: "Earlier messages get dropped, summarized, or the request fails",
    alt1: "The model automatically upgrades to a larger context",
    alt2: "The conversation is saved to a database",
    alt3: "The model starts a new training run",
  },
  {
    question: "What does temperature=0 mean in practice?",
    answer: "The model always picks the most likely next token (deterministic)",
    alt1: "The model generates maximally creative output",
    alt2: "The model stops generating text",
    alt3: "The model uses no energy for inference",
  },
  {
    question: "What is 'tool use' in the context of AI agents?",
    answer: "The model outputs structured requests that the host system executes",
    alt1: "The model directly accesses the internet",
    alt2: "The model modifies its own weights",
    alt3: "The model uses physical robotic tools",
  },
  {
    question: "What does MCP (Model Context Protocol) provide?",
    answer: "A standard interface for connecting AI models to external tools and data",
    alt1: "A way to compress models to run on phones",
    alt2: "A chat protocol between users",
    alt3: "A method to train models faster",
  },
  {
    question: "In the agentic loop, what comes after 'Act'?",
    answer: "Observe — check the result of the action",
    alt1: "Plan — make a new plan from scratch",
    alt2: "Done — the task is always complete after acting",
    alt3: "Train — update the model's weights",
  },
  {
    question: "Why can LLMs exhibit biased behavior?",
    answer: "They reflect patterns and biases present in their training data",
    alt1: "They are intentionally programmed with preferences",
    alt2: "They develop their own opinions during inference",
    alt3: "Bias is impossible in mathematical systems",
  },
  {
    question: "Which is the BEST strategy for a complex multi-step task?",
    answer: "Break it into smaller steps and verify each one before proceeding",
    alt1: "Write one very long, detailed prompt",
    alt2: "Always use the largest model available",
    alt3: "Set temperature to maximum for creativity",
  },
  {
    question: "Why should you review AI-generated code?",
    answer: "It can look correct but contain subtle bugs, security issues, or license problems",
    alt1: "AI code is always wrong",
    alt2: "It's a legal requirement in all countries",
    alt3: "The AI expects you to review it",
  },
  {
    question: "What's the relationship between prompt quality and environmental impact?",
    answer: "Better prompts need fewer retries, using less compute and energy",
    alt1: "There is no relationship",
    alt2: "Longer prompts are always greener",
    alt3: "Only training has environmental impact, not inference",
  },
];

export function Guide25() {
  return (
    <QuizSection
      items={items}
      answerKey="answer"
      renderQuestion={(q) => (
        <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.5, padding: "8px 0" }}>
          {q.question}
        </div>
      )}
      optionCount={4}
      color="#E65100"
      resultMessages={{
        high: "Excellent! You've got a solid understanding of AI interaction.",
        mid: "Good foundation! Review the guides on topics you missed.",
        low: "Worth another pass through the guides — these concepts will serve you well.",
      }}
    />
  );
}
