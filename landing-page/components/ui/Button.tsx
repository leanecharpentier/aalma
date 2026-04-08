"use client";

import { LoaderCircle } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Button as AriaButton } from "react-aria-components";
import { tv } from "tailwind-variants";

const button = tv({
  base: "cursor-pointer inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200",
  variants: {
    color: {
      primary: "bg-primary-500 text-white hover:bg-primary-600",
      outline:
        "bg-transparent text-ek-gray-800 border border-ek-gray-800 hover:bg-ek-gray-100",
      ghost: "bg-transparent text-foreground hover:bg-primary-100",
      white: "bg-white text-primary-500 hover:bg-gray-50",
    },
    size: {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-3.5 text-sm",
    },
    rounded: {
      full: "rounded-full",
      normal: "rounded-xl",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: "",
    },
    loading: {
      true: "cursor-not-allowed opacity-50",
      false: "",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    rounded: "normal",
    disabled: false,
    loading: false,
  },
});

type ButtonProps = {
  color?: keyof typeof button.variants.color;
  size?: keyof typeof button.variants.size;
  rounded?: keyof typeof button.variants.rounded;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onPress?: () => void;
} & PropsWithChildren;

export function Button({
  children,
  color,
  size,
  rounded,
  disabled,
  loading,
  loadingText,
  left,
  right,
  className,
  type,
  onPress,
}: ButtonProps) {
  return (
    <AriaButton
      onPress={onPress}
      className={button({
        color,
        size,
        rounded,
        disabled,
        loading,
        className,
      })}
      isDisabled={disabled || loading}
      type={type}
    >
      {left}
      <span className="text-current">
        {loading ? (
          loadingText ? (
            loadingText
          ) : (
            <LoaderCircle className="animate-spin" size={16} />
          )
        ) : (
          children
        )}
      </span>
      {right}
    </AriaButton>
  );
}
