import { ChevronDown } from "lucide-react";

type Field = {
  name: string;
  label: string;
  type: string;
  options?: readonly string[];
  placeholder?: string;
  required?: boolean;
};

type Props = {
  field: Field;
  getError:(fieldName:string)=>string[]
  onClearError:(name:string)=>void
};

export default function DynamicField({ field, getError, onClearError}: Props) {

  const error = getError(`dynamicField.${field.name}`);


  return (
    <div className="relative group">
      <label htmlFor={field.name} className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
        {field.label}
        {field.required && <span className="text-pink-500 ml-1">*</span>}
      </label>

      {field.type === "select" ? (
        <div className="relative">
          <select
            id={field.name}
            name={`dynamicField.${field.name}`}
            onChange={()=>onClearError(`dynamicField.${field.name}`)}
            className={`w-full px-4 py-2 sm:py-3 pr-10 bg-white/5 border rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer
              ${error.length ? "border-red-500" : "border-white/10"}`}
          >
            <option value="">
              {field.placeholder || `Select ${field.label}`}
            </option>
            {field.options?.map((opt) => (
              <option key={opt} 
               
              value={opt} className="bg-gray-900">
                {opt}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none group-focus-within:text-purple-500 transition-colors" />

          {error.length > 0 && (
            <p className="mt-1 text-sm text-red-400">
              {error.join(", ")}
            </p>
          )}

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-linear-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity -z-10 blur"></div>
        </div>
      ) : (
        <div className="relative">
          <input
            name={`dynamicField.${field.name}`}
            id={`dynamicField.${field.name}`}
            type={field.type}
            placeholder={field.placeholder || field.label}
            onChange={()=>onClearError(`dynamicField.${field.name}`)}
            className={`w-full px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm
              ${error.length ? "border-red-500 focus:ring-red-500" : ""}`}
          />

           {error.length > 0 && (
            <p className="mt-1 text-sm text-red-400">
              {error.join(", ")}
            </p>
          )}
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity -z-10 blur"></div>
        </div>
      )}
    </div>
  );
}
