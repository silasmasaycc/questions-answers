interface AnswerProps {
  text: string;
}

interface QuestionProps {
  title: string;
  answer: AnswerProps[];
  typeAnswer: boolean;
}

export interface FormProps {
  title: string;
  description: string;
  questions: QuestionProps[];
}