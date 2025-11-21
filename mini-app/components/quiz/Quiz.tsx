"use client";

import { useState, useMemo } from "react";
import Result from "./Result";

type Option = {
  text: string;
  animal: string;
};

type Question = {
  question: string;
  options: Option[];
};

const questions: Question[] = [
  {
    question: "What’s your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Leaves", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grass", animal: "horse" },
    ],
  },
  {
    question: "How do you prefer to spend a weekend?",
    options: [
      { text: "Reading a book", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Exploring the woods", animal: "fox" },
      { text: "Storing snacks", animal: "hamster" },
      { text: "Riding a bike", animal: "horse" },
    ],
  },
  {
    question: "What’s your ideal sleeping spot?",
    options: [
      { text: "A cozy blanket", animal: "cat" },
      { text: "A warm bed", animal: "dog" },
      { text: "A hidden burrow", animal: "fox" },
      { text: "A small cage", animal: "hamster" },
      { text: "A stable", animal: "horse" },
    ],
  },
  {
    question: "Which trait describes you best?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Loyal", animal: "dog" },
      { text: "Clever", animal: "fox" },
      { text: "Curious", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
  {
    question: "What’s your favorite activity?",
    options: [
      { text: "Chasing a laser", animal: "cat" },
      { text: "Going for a walk", animal: "dog" },
      { text: "Hunting", animal: "fox" },
      { text: "Nibbling", animal: "hamster" },
      { text: "Galloping", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const shuffledOptions = useMemo(() => shuffleArray(questions[current].options), [current]);

  const handleSelect = (animal: string) => {
    setAnswers((prev) => [...prev, animal]);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers([]);
  };

  if (current >= questions.length) {
    return <Result answers={answers} onRetake={resetQuiz} />;
  }

  const { question } = questions[current];

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <button
            key={opt.text}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleSelect(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
