import { forwardRef } from "react";

const Input = forwardRef(function Input({label, defaultValue, ...rest}, ref) {
    return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700">{label}</span>

      <input
        ref={ref}
        type="text"
        defaultValue={defaultValue}
        {...rest}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm placeholder-gray-400 
          focus:ring-2  focus:ring-blue-500 focus:border-blue-500 
          invalid:border-red-500 invalid:text-red-600 
          focus:invalid:ring-red-500 focus:invalid:border-red-500
"
      />
    </label>);
});

export default Input;