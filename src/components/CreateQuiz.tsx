import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { MdSave } from "react-icons/md";
import Input from "./Input";
import InputRadio from "./InputRadio";
import Button from "./Button";

import { FormProps } from "./@types/form";

interface ReduxProps {
  form: FormProps
}

interface CreateQuizProps {
  answer: string;
}

const DEFAULT_FORM_VALUES = {
  answer: ''
}

export default function CreateQuiz() {
  const { control, handleSubmit, formState: { isDirty, isValid, isSubmitting } } = useForm<CreateQuizProps>({
    defaultValues: DEFAULT_FORM_VALUES
  });

  const { form } = useSelector((state: ReduxProps) => state);

  const onSubmit: SubmitHandler<CreateQuizProps> = (form: CreateQuizProps) => {
    console.log(form);
  }

  console.log(form);

  return form && (
    <div className="w-3/4 relative">
      <div className="px-6 py-3 bg-white text-gray-700 rounded shadow-lg">
        <div className="my-4 leading-6 space-y-4 sm:leading-7">
          <h1 className="text-2xl text-center font-semibold">{form.title}</h1>
          <p className="text-lg font-base">{form.description}</p>
        </div>
      </div>

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded p-3 fixed top-8 right-8 shadow-lg">
          <div className="flex flex-col gap-3">
            <Button
              tooltip="Salvar"
              props={{
                type: "submit",
                disabled: !isDirty || !isValid || isSubmitting
              }}
            >
              <MdSave className="text-2xl" />
            </Button>
          </div>
        </div>

        {form.questions.map((question, indexQuestion) => (
          <div key={indexQuestion} className="my-6 px-6 py-3 bg-white text-gray-700 rounded shadow-lg">
            <h1 className="text-2xl font-semibold mb-6">{question.title}</h1>
            <div className="my-4 leading-6 space-y-4 sm:leading-7">
              {question.typeAnswer ? question.answer.map(({ text }, indexAnswer) => (
                <InputRadio
                  key={indexAnswer}
                  control={control}
                  name={`answer.${indexQuestion}.text`}
                  props={{
                    value: text,
                    label: text
                  }}
                />
              )) : (
                <Input
                  control={control}
                  name={`answer.${indexQuestion}.text`}
                  props={{
                    type: "text",
                    placeholder: "Resposta"
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}