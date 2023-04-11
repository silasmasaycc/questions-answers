import { Control, FormState, UseFormWatch, useFieldArray } from "react-hook-form";
import { MdDeleteForever, MdOutlineLibraryAdd, MdSave } from "react-icons/md";
import Answers from "./Answer";
import Button from "./Button";
import Input from "./Input";
import InputToggle from "./InputToggle";

import { FormProps } from "./@types/form";

interface QuestionsProps {
  control: Control<FormProps | any>;
  watch: UseFormWatch<FormProps>;
  formState: FormState<FormProps>;
}

const DEFAULT_QUESTION_VALUES = {
  typeAnswer: false,
  title: '',
  answer: []
}

export default function Questions({ control, watch, formState }: QuestionsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const { errors, isSubmitting } = formState;

  const typeAnswerWatch = fields.map((_, index) => watch(`questions.${index}.typeAnswer`));

  return (
    <>
      <div className="bg-white rounded p-3 fixed top-8 right-8 shadow-lg">
        <div className="flex flex-col gap-3">
          <Button
            tooltip="Salvar"
            props={{
              type: "submit",
              disabled: isSubmitting
            }}
          >
            <MdSave className="text-2xl" />
          </Button>

          <Button
            tooltip="Adicionar Pergunta"
            props={{
              type: "button",
              onClick: () => append(DEFAULT_QUESTION_VALUES)
            }}
          >
            <MdOutlineLibraryAdd className="text-2xl" />
          </Button>
        </div>
      </div>

      {fields.map((question, indexQuestion) => (
        <div
          key={question.id}
          className="mt-6 bg-white text-gray-700 rounded shadow-lg"
        >
          <div className="px-6 py-3">
            <Input
              control={control}
              name={`questions.${indexQuestion}.title`}
              props={{
                type: "text",
                placeholder: "Pergunta"
              }}
            />

            {errors?.questions?.[indexQuestion]?.title?.type === 'required' && (
              <span className="text-sm italic text-red-500">Campo obrigatório!</span>
            )}

            <Answers {...{ indexQuestion, typeAnswerWatch, control, formState }} />
          </div>

          <div className="flex justify-between p-6">
            <InputToggle
              control={control}
              name={`questions.${indexQuestion}.typeAnswer`}
              props={{
                label: "Multipla",
              }}
            />

            <Button
              tooltip="Remover Pergunta"
              props={{
                type: "button",
                onClick: () => remove(indexQuestion)
              }}
            >
              <MdDeleteForever className="text-2xl" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}