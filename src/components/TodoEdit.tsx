import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Todo } from "./TodoItem";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TodoEditProps {
  todo: Todo | null;
  availableTags: string[];
  onSave: (updatedTodo: Todo) => void;
  onCancel: () => void;
  open: boolean;
}

const TodoEdit = ({
  todo,
  availableTags,
  onSave,
  onCancel,
  open,
}: TodoEditProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [tag, setTag] = useState<string>("");
  const [completed, setCompleted] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      // Convert the string date to Date object
      setDate(todo.date ? parseISO(todo.date) : new Date());
      setPriority(todo.priority || "medium");
      setTag(todo.tag || availableTags[0] || "");
      setCompleted(todo.completed);
    }
  }, [todo, availableTags]);

  const handleSave = () => {
    if (todo && title.trim()) {
      onSave({
        ...todo,
        title: title.trim(),
        date: format(date, "yyyy-MM-dd"),
        priority,
        tag,
        completed,
      });
    }
  };

  if (!todo) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={() => onCancel()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-todo-card text-todo-text-primary p-2 focus:outline-none focus:ring-1 focus:ring-todo-highlight placeholder:text-todo-text-secondary rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm mb-2 text-todo-text-secondary">
                  Date
                </label>
                <Button
                  variant="outline"
                  onClick={() => setDatePickerOpen(true)}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </div>

              <div>
                <label className="block text-sm mb-2 text-todo-text-secondary">
                  Tag
                </label>
                <Select value={tag} onValueChange={setTag}>
                  <SelectTrigger className="w-full">
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

            <div>
              <label className="block text-sm mb-2 text-todo-text-secondary">
                Priority
              </label>
              <RadioGroup
                value={priority}
                onValueChange={(value) =>
                  setPriority(value as "high" | "medium" | "low")
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="edit-high" />
                  <label htmlFor="edit-high" className="text-sm font-medium">
                    High
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="edit-medium" />
                  <label htmlFor="edit-medium" className="text-sm font-medium">
                    Medium
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="edit-low" />
                  <label htmlFor="edit-low" className="text-sm font-medium">
                    Low
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Separate Calendar Dialog */}
      <Dialog open={datePickerOpen} onOpenChange={setDatePickerOpen}>
        <DialogContent className="sm:max-w-[350px] p-0">
          <div className="p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                  setDatePickerOpen(false);
                }
              }}
              initialFocus
            />
          </div>
          <div className="p-3 border-t flex justify-end">
            <Button variant="ghost" onClick={() => setDatePickerOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoEdit;
