import type { Question } from "../types";
import {
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  FillBlankQuestion,
  WhoSaidItQuestion,
  HintDeductionQuestion,
} from "./questions";
import { VerseScrambleQuestion } from "./questions/VerseScrambleQuestion";
import { TimelineQuestion } from "./questions/TimelineQuestion";

interface Props {
  question: Question;
  onAnswer: (params: {
    selectedIndex?: number;
    selectedBool?: boolean;
    selectedText?: string;
    selectedOrder?: number[];
    hintsUsed?: number;
  }) => void;
  disabled?: boolean;
}

export function QuestionRenderer({
  question,
  onAnswer,
  disabled = false,
}: Props) {
  switch (question.type) {
    case "multiple-choice":
      return (
        <MultipleChoiceQuestion
          question={question}
          onAnswer={(index) => onAnswer({ selectedIndex: index })}
          disabled={disabled}
        />
      );

    case "true-false":
      return (
        <TrueFalseQuestion
          question={question}
          onAnswer={(value) => onAnswer({ selectedBool: value })}
          disabled={disabled}
        />
      );

    case "fill-blank":
      return (
        <FillBlankQuestion
          question={question}
          onAnswer={(index) => onAnswer({ selectedIndex: index })}
          disabled={disabled}
        />
      );

    case "who-said-it":
      return (
        <WhoSaidItQuestion
          question={question}
          onAnswer={(index) => onAnswer({ selectedIndex: index })}
          disabled={disabled}
        />
      );

    case "hint-deduction":
      return (
        <HintDeductionQuestion
          question={question}
          onAnswer={(text, hintsUsed) =>
            onAnswer({ selectedText: text, hintsUsed })
          }
          disabled={disabled}
        />
      );

    case "verse-scramble":
      return (
        <VerseScrambleQuestion
          question={question}
          onAnswer={(order) => onAnswer({ selectedOrder: order })}
          disabled={disabled}
        />
      );

    case "timeline":
      return (
        <TimelineQuestion
          question={question}
          onAnswer={(order) => onAnswer({ selectedOrder: order })}
          disabled={disabled}
        />
      );

    default:
      return null;
  }
}
