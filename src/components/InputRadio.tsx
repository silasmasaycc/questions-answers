import { Control, Controller } from "react-hook-form";

import { FormProps } from "./@types/form";

interface InputProps {
  control: Control<FormProps | any>;
  name: string;
  props: {
    value: string;
    label: string;
  }
}

export default function InputRadio({ name, control, props }: InputProps) {
  return (
    <Controller
      render={({ field }) => (
        <>
          <label className="flex items-center text-base">
            <input
              {...field}
              {...props}
              type="radio"
              className="w-4 h-4 text-blue-500 bg-gray-200 border-gray-300 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 mr-3 mt-1"
            />
            <span>{props.label}</span>
          </label>
        </>
      )}
      name={name}
      control={control}
    />
  );
}