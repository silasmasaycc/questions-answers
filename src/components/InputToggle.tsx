import { Control, Controller } from "react-hook-form";

import { FormProps } from "./@types/form";

interface InputProps {
  control: Control<FormProps | any>;
  name: string;
  props: {
    value?: string;
    label: string;
  }
}

export default function InputToggle({ name, control, props }: InputProps) {
  return (
    <Controller
      render={({ field }) => (
        <label className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
          <span className="relative">
            <input
              {...field}
              {...props}
              type="checkbox"
              className="hidden peer"
            />
            <div className="w-10 h-4 rounded-full shadow bg-gray-200 peer-checked:bg-blue-500"></div>
            <div className="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto bg-blue-500"></div>
          </span>
          <span>{props.label}</span>
        </label>
      )}
      name={name}
      control={control}
    />
  );
}