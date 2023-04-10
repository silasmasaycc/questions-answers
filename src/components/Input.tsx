import { Control, Controller } from "react-hook-form";

import { FormProps } from "./@types/form";

interface InputProps {
  control: Control<FormProps | any>;
  name: string;
  props: {
    type: string;
    value?: string;
    placeholder?: string;
  }
}

export default function Input({ name, control, props }: InputProps) {
  return (
    <Controller
      render={({ field }) => (
        <input
          {...field}
          {...props}
          className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue"
        />
      )}
      name={name}
      control={control}
    />
  );
}