import { Control, FormState, useFieldArray } from "react-hook-form";
import { ReactElement, useEffect } from "react";
import { MdClose, MdOutlineNoteAdd } from "react-icons/md";
import Button from "./Button";
import Input from "./Input";

import { FormProps } from "./@types/form";

interface AnswersProps {
  indexQuestion: number;
  typeAnswerWatch: boolean[];
  control: Control<FormProps | any>;
  formState: FormState<FormProps>;
}

export default function Answers({ indexQuestion, typeAnswerWatch, control, formState }: AnswersProps): ReactElement[] | any {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${indexQuestion}.answer`
  });

  const { errors } = formState;

  const typeAnswer = !!typeAnswerWatch[indexQuestion];

  const handleAnswersAdd = () => append({ text: '' });

  const handleAnswersRemove = (index: number) => {
    if (fields.length !== 1) {
      remove(index);
    }
  }

  useEffect(() => {
    if (!fields.length && typeAnswer) {
      handleAnswersAdd();
    }
  }, [typeAnswer]);

  return typeAnswer ?
    fields.map((answer, index) => (
      <>
        <div key={answer.id} className="flex flex-row mt-6 gap-2">
          <Input
            control={control}
            name={`questions.${indexQuestion}.answer.${index}.text`}
            props={{
              type: "text",
              placeholder: "Resposta"
            }}
          />

          <Button
            tooltip="Adicionar Resposta"
            props={{
              type: "button",
              onClick: () => handleAnswersAdd()
            }}
          >
            <MdOutlineNoteAdd className="text-2xl" />
          </Button>

          <Button
            tooltip="Remover Resposta"
            props={{
              type: "button",
              onClick: () => handleAnswersRemove(index)
            }}
          >
            <MdClose className="text-2xl" />
          </Button>
        </div>

        {errors?.questions?.[indexQuestion]?.answer?.[index]?.text?.type === 'required' && (
          <span className="text-sm italic text-red-500">Campo obrigatório!</span>
        )}
      </>
    )) : <></>;
}