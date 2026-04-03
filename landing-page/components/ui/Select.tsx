"use client";

import { ChevronDown } from "lucide-react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue,
  type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps } from "../utils";
import { Description, FieldError } from "./Field";

const selectButton = tv({
  base: "flex items-center justify-between w-full border border-primary-300 rounded-lg bg-primary-50 py-2.5 px-3 text-sm text-foreground outline-none transition-colors cursor-pointer",
  variants: {
    isFocused: {
      true: "border-primary-500",
    },
    isOpen: {
      true: "border-primary-500",
    },
  },
});

interface SelectOption {
  id: string;
  label: string;
}

interface SelectProps extends Omit<AriaSelectProps<SelectOption>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  options: SelectOption[];
}

export function Select({
  label,
  description,
  errorMessage,
  options,
  ...props
}: SelectProps) {
  return (
    <AriaSelect
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1 font-sans",
      )}
    >
      {label && (
        <Label className="font-sans text-sm text-foreground font-medium cursor-default w-fit">
          {label}{props.isRequired && <span className="text-black"> *</span>}
        </Label>
      )}
      <Button className={selectButton}>
        <SelectValue className="text-sm placeholder-shown:text-primary-300" />
        <ChevronDown size={16} className="text-gray-400" />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="w-[var(--trigger-width)] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out">
        <ListBox className="outline-none p-1 max-h-60 overflow-auto">
          {options.map((option) => (
            <ListBoxItem
              key={option.id}
              id={option.id}
              textValue={option.label}
              className="px-3 py-2 text-sm rounded-lg cursor-pointer outline-none hover:bg-primary-50 focus:bg-primary-50 selected:text-primary-500 selected:font-medium"
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
