"use client";

import { ChevronDown } from "lucide-react";
import {
  Select as AriaSelect,
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const trigger = tv({
  base: "flex flex-row items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-white text-sm text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors outline-none",
});

const item = tv({
  base: "px-3 py-2 text-sm text-gray-700 rounded-lg cursor-pointer outline-none hover:bg-gray-50 selected:bg-primary-40 selected:text-primary-500",
});

export interface SelectOption {
  id: string;
  label: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  selectedKey?: string;
  onSelectionChange?: (key: string) => void;
  icon?: React.ReactNode;
}

export default function Select({
  label,
  placeholder = "Sélectionner",
  options,
  selectedKey,
  onSelectionChange,
  icon,
}: SelectProps) {
  return (
    <AriaSelect
      selectedKey={selectedKey}
      onSelectionChange={(key) => onSelectionChange?.(key as string)}
    >
      {label && <Label className="sr-only">{label}</Label>}
      <Button className={trigger()}>
        {icon}
        <SelectValue className="text-sm text-gray-600">
          {({ isPlaceholder }) =>
            isPlaceholder ? (
              <span className="text-gray-400">{placeholder}</span>
            ) : null
          }
        </SelectValue>
        <ChevronDown size={14} className="text-gray-400 shrink-0" />
      </Button>
      <Popover className="w-44 bg-white border border-gray-100 rounded-xl shadow-lg p-1 z-50">
        <ListBox>
          {options.map((opt) => (
            <ListBoxItem key={opt.id} id={opt.id} className={item()}>
              {opt.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
