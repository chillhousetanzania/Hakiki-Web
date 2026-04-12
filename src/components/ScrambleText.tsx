"use client";
import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}—=+*^?#";

export default function ScrambleText({
  words,
  duration = 3000,
}: {
  words: string[];
  duration?: number;
}) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    let wordIndex = 0;
    let interval: NodeJS.Timeout;

    const scramble = () => {
      const targetWord = words[wordIndex];
      let iteration = 0;

      const scrambleInterval = setInterval(() => {
        setText(
          targetWord
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return targetWord[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        iteration += 1 / 3; // Adjust speed of deciphering

        if (iteration >= targetWord.length) {
          clearInterval(scrambleInterval);
        }
      }, 30);
    };

    interval = setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      scramble();
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return <span className="inline-block">{text}</span>;
}
