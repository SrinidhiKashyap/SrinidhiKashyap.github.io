import { memo } from "react";
import { classNames } from "../../../shared/lib/classNames";

type LetterRevealProps = {
  children: string;
  progress: number;
  className?: string;
};

/**
 * LetterReveal
 *
 * Reveals text character-by-character based on a 0–1 progress value.
 * Characters up to `progress * length` are lit (white), the rest are dimmed.
 * Uses `transition-colors duration-slow` for a smooth fade-in effect.
 */
export const LetterReveal = memo(function LetterReveal({ children, progress, className }: LetterRevealProps) {
  const characters = Array.from(children);
  const litCount = Math.ceil(characters.length * progress);

  return (
    <span className={className}>
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={classNames(
            "transition-colors duration-slow",
            index < litCount ? "text-white" : "text-white/20",
          )}
        >
          {character}
        </span>
      ))}
    </span>
  );
});