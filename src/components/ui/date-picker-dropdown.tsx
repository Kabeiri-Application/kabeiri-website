import * as React from "react";

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerDropdownProps {
  /** Current selected date (or undefined for none) */
  selected: Date | undefined;
  /** Called when the user picks or clears a date */
  onSelect: (date: Date | undefined) => void;
  /** Optional label shown next to the trigger button */
  label?: string;
  /** If true, show a clear button when a date is selected */
  clearable?: boolean;
  /** Optional className overrides */
  className?: string;
}

interface SimpleCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
  onClear?: () => void;
  clearable?: boolean;
}

function SimpleCalendar({ selected, onSelect, onClear, clearable }: SimpleCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(() => selected || new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const selectDate = (day: number) => {
    const newDate = new Date(year, month, day);
    onSelect(newDate);
  };
  
  const isSelected = (day: number) => {
    if (!selected) return false;
    const dayDate = new Date(year, month, day);
    return (
      selected.getFullYear() === dayDate.getFullYear() &&
      selected.getMonth() === dayDate.getMonth() &&
      selected.getDate() === dayDate.getDate()
    );
  };
  
  const isToday = (day: number) => {
    const today = new Date();
    const dayDate = new Date(year, month, day);
    return (
      today.getFullYear() === dayDate.getFullYear() &&
      today.getMonth() === dayDate.getMonth() &&
      today.getDate() === dayDate.getDate()
    );
  };
  
  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-8 w-8" />);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <button
        key={day}
        onClick={() => selectDate(day)}
        className={cn(
          "h-8 w-8 text-sm rounded-md hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground focus:outline-none",
          isSelected(day) && "bg-primary text-primary-foreground hover:bg-primary/90",
          isToday(day) && !isSelected(day) && "bg-accent text-accent-foreground font-medium"
        )}
      >
        {day}
      </button>
    );
  }
  
  return (
    <div className="p-4 w-72">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={previousMonth}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h2 className="text-sm font-medium">
          {monthNames[month]} {year}
        </h2>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="h-8 w-8 text-xs text-muted-foreground flex items-center justify-center font-medium">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {calendarDays}
      </div>
      
      {/* Clear button */}
      {clearable && selected && (
        <div className="border-t pt-3">
          <Button variant="ghost" size="sm" className="w-full" onClick={onClear}>
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}

/**
 * Dropdown calendar date picker with shadcn styling.
 * Shows a calendar icon that opens a popover with date selection.
 */
export function DatePickerDropdown({
  selected,
  onSelect,
  label,
  clearable = true,
  className,
}: DatePickerDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date) => {
    onSelect(date);
    setOpen(false);
  };

  const handleClear = () => {
    onSelect(undefined);
    setOpen(false);
  };

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {label ? <span className="font-medium">{label}</span> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={label ? `Select ${label}` : "Select date"}
            className="relative"
          >
            <CalendarIcon className="h-4 w-4" />
            {selected && (
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <SimpleCalendar
            selected={selected}
            onSelect={handleSelect}
            onClear={handleClear}
            clearable={clearable}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

DatePickerDropdown.displayName = "DatePickerDropdown";

export default DatePickerDropdown;
