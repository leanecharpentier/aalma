"use client";

import {
  composeRenderProps,
  type FieldErrorProps,
  Group,
  type GroupProps,
  type InputProps,
  type LabelProps,
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  Text,
  type TextProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "../utils";

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        "font-sans text-sm text-foreground font-medium cursor-default w-fit",
        props.className,
      )}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge("text-sm text-gray-500", props.className)}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "text-sm text-red-600 forced-colors:text-[Mark]",
      )}
    />
  );
}

export const fieldBorderStyles = tv({
  base: "transition",
  variants: {
    isFocusWithin: {
      false:
        "border-gray-200 hover:border-gray-300 forced-colors:border-[ButtonBorder]",
      true: "border-primary-500 forced-colors:border-[Highlight]",
    },
    isInvalid: {
      true: "border-red-600 forced-colors:border-[Mark]",
    },
    isDisabled: {
      true: "border-gray-100 forced-colors:border-[GrayText]",
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group flex items-center h-9 box-border bg-white forced-colors:bg-[Field] border rounded-lg overflow-hidden transition",
  variants: fieldBorderStyles.variants,
});

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "px-0 py-2.5 min-h-9 flex-1 min-w-0 border-0 bg-transparent font-sans text-sm text-foreground placeholder:text-primary-300 disabled:text-gray-300 disabled:placeholder:text-gray-200 [-webkit-tap-highlight-color:transparent] outline-none",
      )}
    />
  );
}
