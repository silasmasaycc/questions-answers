import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { persistForm } from "@/store/features/form/formSlice";
import Questions from "./Questions";
import Input from "./Input";

import { FormProps } from "./@types/form";

const DEFAULT_FORM_VALUES = {
  title: '',
  description: '',
  questions: [],
}

export default function CreateForm() {
  const { control, handleSubmit, watch, setValue, getValues, formState } = useForm<FormProps>({
    defaultValues: DEFAULT_FORM_VALUES
  });

  const { errors } = formState;

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormProps> = (form: FormProps) => {
    dispatch(persistForm(form));

    router.push('/quiz');
  }

  return (
    <form className="w-3/4 relative" onSubmit={handleSubmit(onSubmit)}>
      <div className="px-6 py-3 bg-white text-gray-700 rounded shadow-lg">
        <div className="my-4 leading-6 space-y-4 sm:leading-7">
          <Input
            control={control}
            name="title"
            props={{
              type: "text",
              placeholder: "Título"
            }}
          />

          {errors?.title?.type === 'required' && (
            <span className="text-sm italic text-red-500">Campo obrigatório!</span>
          )}
        </div>
        <div className="my-4 leading-6 space-y-4 sm:leading-7">
          <Input
            control={control}
            name="description"
            props={{
              type: "text",
              placeholder: "Descrição"
            }}
          />

          {errors?.description?.type === 'required' && (
            <span className="text-sm italic text-red-500">Campo obrigatório!</span>
          )}
        </div>
      </div>

      <Questions {...{ control, handleSubmit, watch, setValue, getValues, formState }} />
    </form >
  );
}