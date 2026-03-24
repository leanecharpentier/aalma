import { tv } from "tailwind-variants";

const textField = tv({
  slots: {
    wrapper: "flex flex-col gap-1.5",
    label: "text-sm font-medium text-foreground",
    input:
      "w-full border-b border-gray-200 bg-transparent py-2.5 text-sm text-foreground placeholder:text-primary-300 outline-none transition-colors focus:border-primary-500",
  },
});

const { wrapper, label, input } = textField();

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export function TextField({
  label: labelText,
  required,
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className={wrapper({ className })}>
      <label className={label()}>
        {labelText}
        {required && "*"}
      </label>
      <input className={input()} {...props} />
    </div>
  );
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export function SelectField({
  label: labelText,
  required,
  options,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <div className={wrapper({ className })}>
      <label className={label()}>
        {labelText}
        {required && "*"}
      </label>
      <select
        className={`${input()} appearance-none cursor-pointer`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
}

export function TextAreaField({
  label: labelText,
  required,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <div className={wrapper({ className })}>
      <label className={label()}>
        {labelText}
        {required && "*"}
      </label>
      <textarea className={`${input()} resize-none`} rows={3} {...props} />
    </div>
  );
}
