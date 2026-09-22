import type { Question } from "../types";
import {
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  FillBlankQuestion,
  WhoSaidItQuestion,
  HintDeductionQuestion,
} from "./questions";

interface Props {
  question: Question;
  onAnswer: (params: {
    selectedIndex?: number;
    selectedBool?: boolean;
    selectedText?: string;
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

    // Los tipos verse-scramble y timeline se implementarán en fase 2
    case "verse-scramble":
    case "timeline":
      return (
        <div className="text-center text-slate-400 py-8">
          Este tipo de pregunta estará disponible pronto.
        </div>
      );

    default:
      return null;
  }
}
