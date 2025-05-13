import React from "react";

export type SortMethod = "none" | "name" | "priority" | "date";

interface SortOptionsProps {
  activeSort: SortMethod;
  onSortChange: (method: SortMethod) => void;
  showDateSort?: boolean;
}

const SortOptions = ({
  activeSort,
  onSortChange,
  showDateSort = false,
}: SortOptionsProps) => {
  let sortMethods: { value: SortMethod; label: string }[] = [
    { value: "none", label: "No Sorting" },
    { value: "name", label: "Sort by Name" },
    { value: "priority", label: "Sort by Priority" },
  ];

  if (showDateSort) {
    sortMethods.push({ value: "date", label: "Sort by Date" });
  }

  return (
    <div className="bg-todo-bg p-4 rounded-lg">
      <h3 className="font-medium mb-3">Sort Tasks</h3>
      <div className="space-y-2">
        {sortMethods.map((method) => (
          <button
            key={method.value}
            className={`w-full text-left py-2 px-3 rounded text-sm ${
              activeSort === method.value
                ? "bg-todo-highlight text-todo-bg"
                : "hover:bg-muted"
            }`}
            onClick={() => onSortChange(method.value)}
          >
            {method.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;
