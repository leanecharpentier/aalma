"use client";

import { LoaderCircle } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Button as NativeButton } from "react-aria-components";
import { tv } from "tailwind-variants";

const button = tv({
  base: "cursor-pointer flex flex-row items-center justify-center gap-1",
  variants: {
    color: {
      Primary: "text-white bg-primary-500",
      White: "border border-gray-200 bg-white text-gray-900",
    },
    size: {
      md: "px-8 py-3.5 text-sm font-medium",
    },
    disabled: {
      false: null,
      true: "cursor-not-allowed",
    },
    rounded: {
      full: "rounded-full",
      normal: "rounded-xl",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
    loading: {
      true: "opacity-50 cursor-not-allowed",
      false: null,
    },
    hidden: {
      true: "hidden",
      false: null,
    },
  },
  defaultVariants: {
    color: "Primary",
    size: "md",
    rounded: "normal",
    fullWidth: false,
    loading: false,
    disabled: false,
    hidden: false,
  },
});

type Props = {
  color?: keyof typeof button.variants.color;
  size?: keyof typeof button.variants.size;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  rounded?: "full" | "normal";
  fullWidth?: boolean;
  hidden?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
} & PropsWithChildren;

export default function Button(props: Props) {
  return (
    <NativeButton
      onPress={props.onClick}
      className={button({
        color: props.color,
        size: props.size,
        rounded: props.rounded,
        fullWidth: props.fullWidth,
        disabled: props.disabled,
        loading: props.loading,
        hidden: props.hidden,
        className: props.className,
      })}
      isDisabled={props.disabled || props.loading}
      type={props.type}
    >
      {props.left}
      <span className="text-current">
        {props.loading ? (
          props.loadingText ? (
            props.loadingText
          ) : (
            <LoaderCircle className="animate-spin" size={16} />
          )
        ) : (
          props.children
        )}
      </span>
      {props.right}
    </NativeButton>
  );
}
