import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  tooltip: string;
  props: {
    type: 'button' | 'submit';
    disabled?: boolean;
    onClick?: () => void;
  }
}

export default function Button({ children, props, tooltip }: ButtonProps) {
  return (
    <button
      {...props}
      className="p-4 hover:bg-gray-200 rounded-full group relative py-3 cursor-pointer"
    >
      {children}
      <div className="opacity-0 w-28 bg-gray-700 text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 mb-2 px-2 pointer-events-none">
        {tooltip}
      </div>
    </button>
  );
}