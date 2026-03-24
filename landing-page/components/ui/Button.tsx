import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "cursor-pointer inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200",
  variants: {
    color: {
      primary: "bg-primary-500 text-white hover:bg-primary-600",
      outline:
        "bg-white text-foreground border border-gray-200 hover:bg-gray-50",
      ghost: "bg-transparent text-foreground hover:bg-primary-100",
      white: "bg-white text-primary-500 hover:bg-gray-50",
    },
    size: {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-3.5 text-base",
    },
    rounded: {
      full: "rounded-full",
      normal: "rounded-xl",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    rounded: "full",
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariants {
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  color,
  size,
  rounded,
  rightIcon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ color, size, rounded, className })} {...props}>
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
}
