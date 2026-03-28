import { QuizSection } from '../../../components/templates/QuizSection';

const items = [
  {
    question: "Which technique shows the model examples of desired output before asking it to perform?",
    answer: "Few-shot prompting",
    alt1: "Chain of thought",
    alt2: "System prompting",
    alt3: "Temperature tuning",
  },
  {
    question: "What is the main benefit of chain-of-thought prompting?",
    answer: "Forces step-by-step reasoning for better accuracy",
    alt1: "Makes responses shorter",
    alt2: "Reduces token costs",
    alt3: "Speeds up inference",
  },
  {
    question: "Where does a system prompt go relative to the conversation?",
    answer: "Before the conversation, as persistent instructions",
    alt1: "At the end of each user message",
    alt2: "Only in the first user message",
    alt3: "It's embedded in the model weights",
  },
  {
    question: "Which prompt is MORE specific?",
    answer: "\"Summarize this article in 3 bullet points for a CTO\"",
    alt1: "\"Summarize this article\"",
    alt2: "\"Tell me about this article\"",
    alt3: "\"What does this article say?\"",
  },
  {
    question: "What format technique is most reliable for getting parseable data from an LLM?",
    answer: "Provide a JSON schema and an example",
    alt1: "Just say 'return JSON'",
    alt2: "Ask for XML instead",
    alt3: "Set temperature to 0",
  },
  {
    question: "How many examples is the 'sweet spot' for few-shot prompting?",
    answer: "3 to 5",
    alt1: "1",
    alt2: "10 to 20",
    alt3: "As many as possible",
  },
  {
    question: "What is the 'Persona' prompt pattern?",
    answer: "Assigning the model an expert identity to shape its responses",
    alt1: "Asking the model to roleplay as the user",
    alt2: "Making the model pretend to be a different AI",
    alt3: "Using first-person pronouns in prompts",
  },
  {
    question: "Why might a well-crafted system prompt be considered 'the product'?",
    answer: "Many AI products are the same base model differentiated by their system prompt",
    alt1: "System prompts are sold separately",
    alt2: "Users write system prompts as the main interaction",
    alt3: "System prompts change the model's architecture",
  },
];

export function Guide12() {
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
      color="#6A1B9A"
      resultMessages={{
        high: "Prompt engineering pro! You've mastered the core techniques.",
        mid: "Good foundation! Review the guides on the topics you missed.",
        low: "Review the Prompt Craft guides and try again — these skills are worth mastering.",
      }}
    />
  );
}
