"use client";

import { useMemo } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type ResultProps = {
  answers: string[];
  onRetake: () => void;
};

const animalImages: Record<string, string> = {
  cat: "/cat.png",
  dog: "/dog.png",
  fox: "/fox.png",
  hamster: "/hamster.png",
  horse: "/horse.png",
};

export default function Result({ answers, onRetake }: ResultProps) {
  const scores = useMemo(() => {
    const tally: Record<string, number> = {
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    };
    answers.forEach((a) => {
      if (tally[a] !== undefined) tally[a] += 1;
    });
    return tally;
  }, [answers]);

  const bestAnimal = Object.entries(scores).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">You are a {bestAnimal}!</h2>
      <img
        src={animalImages[bestAnimal]}
        alt={bestAnimal}
        width={256}
        height={256}
        className="rounded"
      />
      <Share text={`I am a ${bestAnimal}! ${url}`} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
        onClick={onRetake}
      >
        Retake Quiz
      </button>
    </div>
  );
}
