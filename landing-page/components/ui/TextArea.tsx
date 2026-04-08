"use client";

import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  TextArea as AriaTextArea,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils";
import { Description, FieldError, Label } from "./Field";

export interface TextAreaProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  rows?: number;
}

export function TextArea({
  label,
  description,
  errorMessage,
  placeholder,
  rows = 3,
  ...props
}: TextAreaProps) {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1 font-sans",
      )}
    >
      {label && <Label>{label}{props.isRequired && <span className="text-black"> *</span>}</Label>}
      <AriaTextArea
        placeholder={placeholder}
        rows={rows}
        className="px-3 py-2.5 min-w-0 border border-primary-300 rounded-lg bg-primary-50 font-sans text-sm text-foreground placeholder:text-primary-300 outline-none transition-colors focus:border-primary-500 resize-none"
      />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
