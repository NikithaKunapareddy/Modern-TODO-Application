import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Todo } from "./TodoItem";

interface TodoInputProps {
  onAddTodo: (newTodo: Partial<Todo>) => void;
  availableTags: string[];
  currentDate: Date;
}

const TodoInput = ({
  onAddTodo,
  availableTags,
  currentDate,
}: TodoInputProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [tag, setTag] = useState<string>("");
  const [showOptions, setShowOptions] = useState(false);

  // Update the tag when availableTags changes (which happens when the active list changes)
  useEffect(() => {
    // The activeListName is always the last item in availableTags array
    if (availableTags.length > 0) {
      setTag(availableTags[availableTags.length - 1]);
    }
  }, [availableTags]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      // Use the selected date if provided, otherwise use the current page date
      const todoDate = date || currentDate;

      onAddTodo({
        title: title.trim(),
        date: format(todoDate, "yyyy-MM-dd"),
        priority,
        tag,
      });
      setTitle("");
      setDate(undefined);
      setPriority("medium");
      setShowOptions(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 bg-todo-card rounded-lg overflow-hidden"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add Todo"
        className="w-full bg-todo-card text-todo-text-primary p-3 md:p-4 focus:outline-none focus:ring-1 focus:ring-todo-highlight placeholder:text-todo-text-secondary"
      />

      {showOptions ? (
        <div className="p-3 md:p-4 border-t border-gray-700">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm mb-2 text-todo-text-secondary">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal text-xs md:text-base",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span className="truncate">
                        Using current date ({format(currentDate, "PPP")})
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm mb-2 text-todo-text-secondary">
                Tag
              </label>
              <Select value={tag} onValueChange={setTag}>
                <SelectTrigger className="w-full text-xs md:text-base">
                  <SelectValue placeholder="Select tag" />
                </SelectTrigger>
                <SelectContent>
                  {availableTags.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm mb-2 text-todo-text-secondary">
              Priority
            </label>
            <RadioGroup
              value={priority}
              onValueChange={(value) =>
                setPriority(value as "high" | "medium" | "low")
              }
              className="flex flex-wrap gap-4 md:gap-0 md:space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <label
                  htmlFor="high"
                  className="text-xs md:text-sm font-medium"
                >
                  High
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <label
                  htmlFor="medium"
                  className="text-xs md:text-sm font-medium"
                >
                  Medium
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <label htmlFor="low" className="text-xs md:text-sm font-medium">
                  Low
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowOptions(false)}
              className="mr-2 text-xs md:text-sm"
              size="sm"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="text-xs md:text-sm">
              Add Task
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-3 md:px-4 py-2 flex justify-between border-t border-gray-700">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowOptions(true)}
            className="text-xs md:text-sm"
          >
            Add Details
          </Button>
          <Button type="submit" size="sm" className="text-xs md:text-sm">
            Add Task
          </Button>
        </div>
      )}
    </form>
  );
};

export default TodoInput;
