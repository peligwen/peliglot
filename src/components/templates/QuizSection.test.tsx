import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuizSection } from './QuizSection';

type WeatherItem = { question: string; answer: string; icon: string };

const items: WeatherItem[] = [
  { question: 'It\'s hot', answer: 'Hace calor', icon: '🌡️' },
  { question: 'It\'s raining', answer: 'Está lloviendo', icon: '🌧️' },
  { question: 'It\'s cold', answer: 'Hace frío', icon: '🥶' },
  { question: 'It\'s sunny', answer: 'Hace sol', icon: '☀️' },
  { question: 'It\'s windy', answer: 'Hace viento', icon: '💨' },
];

function renderQuestion(q: WeatherItem) {
  return (
    <div>
      <div style={{ fontSize: 56 }}>{q.icon}</div>
      <div style={{ fontSize: 17, fontWeight: 700 }}>{q.question}</div>
    </div>
  );
}

describe('QuizSection', () => {
  it('renders the first question', () => {
    render(
      <QuizSection
        items={items}
        answerKey="answer"
        renderQuestion={renderQuestion}
        optionCount={4}
        color="#0277BD"
      />
    );
    // One of the questions should be visible (quiz shuffles order)
    const allQuestions = items.map(i => i.question);
    const found = allQuestions.some(q => screen.queryByText(q) !== null);
    expect(found).toBe(true);
  });

  it('renders 4 option buttons', () => {
    render(
      <QuizSection
        items={items}
        answerKey="answer"
        renderQuestion={renderQuestion}
        optionCount={4}
        color="#0277BD"
      />
    );
    // Options are rendered as answer text buttons in a 2x2 grid
    // All 4 options should be present as buttons
    const answerValues = items.map(i => i.answer);
    const optionButtons = screen
      .getAllByRole('button')
      .filter(btn => answerValues.includes(btn.textContent));
    expect(optionButtons.length).toBe(4);
  });

  it('shows the question counter', () => {
    render(
      <QuizSection
        items={items}
        answerKey="answer"
        renderQuestion={renderQuestion}
        optionCount={4}
        color="#0277BD"
      />
    );
    expect(screen.getByText(/Question 1 \/ \d+/)).toBeInTheDocument();
  });

  it('reveals a Next button after choosing an answer', async () => {
    const user = userEvent.setup();
    render(
      <QuizSection
        items={items}
        answerKey="answer"
        renderQuestion={renderQuestion}
        optionCount={4}
        color="#0277BD"
      />
    );
    // Click the first option button found
    const answerValues = items.map(i => i.answer);
    const optionButtons = screen
      .getAllByRole('button')
      .filter(btn => answerValues.includes(btn.textContent));
    await user.click(optionButtons[0]);
    expect(screen.getByRole('button', { name: /Next|See Results/ })).toBeInTheDocument();
  });

  it('renders an optional title when provided', () => {
    render(
      <QuizSection
        items={items}
        answerKey="answer"
        renderQuestion={renderQuestion}
        optionCount={4}
        color="#0277BD"
        title="Weather Quiz"
      />
    );
    expect(screen.getByText('Weather Quiz')).toBeInTheDocument();
  });
});
