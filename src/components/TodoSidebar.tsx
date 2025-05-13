import React from "react";
import { Plus, ListTodo, X } from "lucide-react";
import { cn } from "@/lib/utils";

type TodoList = {
  id: string;
  name: string;
  active?: boolean;
};

interface TodoSidebarProps {
  lists: TodoList[];
  onAddList: () => void;
  onSelectList: (id: string) => void;
  onDeleteList: (id: string) => void;
  onShowAllTodos: () => void;
  showingAllTodos: boolean;
}

const TodoSidebar = ({
  lists,
  onAddList,
  onSelectList,
  onDeleteList,
  onShowAllTodos,
  showingAllTodos,
}: TodoSidebarProps) => {
  return (
    <aside className="h-full flex flex-col py-6 px-4">
      <div className="hidden md:flex items-center gap-2 mb-8 px-2">
        <ListTodo className="text-todo-yellow w-5 h-5" />
        <h1 className="text-xl font-bold">Your Todo's</h1>
      </div>

      <div className="mb-4 px-2 flex-1 overflow-y-auto">
        <h2 className="text-sm text-todo-text-secondary mb-3">My Lists</h2>
        <ul className="space-y-2">
          <li>
            <div
              className={cn(
                "w-full px-3 py-2 rounded-md flex justify-between items-center transition-colors",
                showingAllTodos
                  ? "bg-todo-yellow text-todo-bg"
                  : "hover:bg-muted text-todo-text-primary"
              )}
            >
              <button onClick={onShowAllTodos} className="flex-grow text-left">
                All Todos
              </button>
            </div>
          </li>
          {lists.map((list) => (
            <li key={list.id}>
              <div
                className={cn(
                  "w-full px-3 py-2 rounded-md flex justify-between items-center transition-colors",
                  list.active
                    ? "bg-todo-yellow text-todo-bg"
                    : "hover:bg-muted text-todo-text-primary"
                )}
              >
                <button
                  onClick={() => onSelectList(list.id)}
                  className="flex-grow text-left"
                >
                  {list.name}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteList(list.id);
                  }}
                  className={cn(
                    "hover:text-red-500",
                    list.active ? "text-todo-bg" : "text-todo-text-secondary"
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onAddList}
        className="flex items-center gap-2 text-todo-text-secondary hover:text-todo-text-primary transition-colors px-2"
      >
        <Plus className="w-4 h-4" />
        <span>New List</span>
      </button>
    </aside>
  );
};

export default TodoSidebar;
