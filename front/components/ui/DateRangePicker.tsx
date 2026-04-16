"use client";

import { CalendarDays } from "lucide-react";
import {
  DateRangePicker as AriaDateRangePicker,
  Button,
  CalendarCell,
  CalendarGrid,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
} from "react-aria-components";

interface DateRangePickerProps {
  label?: string;
}

export default function DateRangePicker({
  label = "Date",
}: DateRangePickerProps) {
  return (
    <AriaDateRangePicker>
      <Label className="sr-only">{label}</Label>
      <Group className="flex flex-row items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-white text-sm text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors outline-none">
        <CalendarDays size={14} className="text-gray-400 shrink-0" />
        <span className="text-sm text-gray-600">{label}</span>
        <Button className="outline-none">
          <CalendarDays size={14} className="text-gray-400" />
        </Button>
      </Group>
      <Popover className="bg-white border border-gray-100 rounded-2xl shadow-lg p-4 z-50">
        <Dialog>
          <RangeCalendar className="outline-none">
            <header className="flex items-center justify-between mb-4">
              <Button
                slot="previous"
                className="p-1 rounded-lg hover:bg-gray-50 text-gray-500 outline-none"
              >
                ‹
              </Button>
              <Heading className="text-sm font-semibold text-gray-900" />
              <Button
                slot="next"
                className="p-1 rounded-lg hover:bg-gray-50 text-gray-500 outline-none"
              >
                ›
              </Button>
            </header>
            <CalendarGrid className="border-separate border-spacing-1">
              {(date) => (
                <CalendarCell
                  date={date}
                  className="w-8 h-8 text-xs text-center rounded-lg outline-none
                    hover:bg-gray-50 
                    selected:bg-primary-500 selected:text-white
                    [&[data-selection-start]]:rounded-l-lg
                    [&[data-selection-end]]:rounded-r-lg
                    cursor-pointer"
                />
              )}
            </CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </AriaDateRangePicker>
  );
}
