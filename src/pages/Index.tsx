import React, { useState, useEffect } from "react";
import TodoSidebar from "@/components/TodoSidebar";
import TodoItem, { Todo, Tag } from "@/components/TodoItem";
import TodoInput from "@/components/TodoInput";
import TodoEdit from "@/components/TodoEdit";
import Calendar from "@/components/Calendar";
import SortOptions, { SortMethod } from "@/components/SortOptions";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Sample data for initial load if localStorage is empty
const initialLists = [
  { id: "list-1", name: "Life", active: true },
  { id: "list-2", name: "Work", active: false },
];

const initialTodos: Todo[] = [
  {
    id: "todo-1",
    title: "Go to gym",
    date: "2023-02-05",
    completed: false,
    tag: "life",
    priority: "high",
  },
  {
    id: "todo-2",
    title: "Brainstorm blog post ideas",
    date: "2023-02-09",
    completed: false,
    tag: "blog",
    priority: "medium",
  },
  {
    id: "todo-3",
    title: "Call Max",
    date: "2023-02-04",
    completed: false,
    tag: "reminder",
    priority: "low",
  },
  {
    id: "todo-4",
    title: "Write blog post",
    date: "2023-02-10",
    completed: false,
    tag: "blog",
    priority: "high",
  },
  {
    id: "todo-5",
    title: "Take out the bins",
    date: "2023-02-04",
    completed: true,
    tag: "life",
    priority: "medium",
  },
];

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lists, setLists] = useState<
    { id: string; name: string; active: boolean }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [sortMethod, setSortMethod] = useState<SortMethod>("none");
  const [activeList, setActiveList] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showingAllTodos, setShowingAllTodos] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedLists = localStorage.getItem("lists");
    const savedActiveList = localStorage.getItem("activeList");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos(initialTodos);
    }

    if (savedLists) {
      setLists(JSON.parse(savedLists));
    } else {
      setLists(initialLists);
    }

    if (savedActiveList) {
      setActiveList(savedActiveList);
    } else {
      setActiveList("list-1");
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem("lists", JSON.stringify(lists));
    }
  }, [lists]);

  useEffect(() => {
    if (activeList) {
      localStorage.setItem("activeList", activeList);
    }
  }, [activeList]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formatDate = (date: Date) => {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return { month, day };
  };

  const handleAddTodo = (newTodo: Partial<Todo>) => {
    const activeListObject = lists.find((list) => list.id === activeList);
    const tag = newTodo.tag || (activeListObject?.name.toLowerCase() as Tag);

    const fullTodo: Todo = {
      id: `todo-${Date.now()}`,
      title: newTodo.title || "",
      date: newTodo.date || format(selectedDate, "yyyy-MM-dd"),
      completed: false,
      tag,
      priority: newTodo.priority || "medium",
    };

    setTodos([fullTodo, ...todos]);
    toast({
      title: "Todo added",
      description: `"${fullTodo.title}" has been added to your list.`,
    });
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast({
      title: "Todo deleted",
      description: "The todo has been removed from your list.",
    });
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = (updatedTodo: Todo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null);
    toast({
      title: "Todo updated",
      description: `"${updatedTodo.title}" has been updated.`,
    });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleAddList = () => {
    const listName = prompt("Enter list name:");
    if (listName && listName.trim()) {
      const newList = {
        id: `list-${Date.now()}`,
        name: listName.trim(),
        active: false,
      };
      setLists([...lists, newList]);
    }
  };

  const handleSelectList = (id: string) => {
    setShowingAllTodos(false);
    setLists(
      lists.map((list) => ({
        ...list,
        active: list.id === id,
      }))
    );
    setActiveList(id);
  };

  const handleShowAllTodos = () => {
    setShowingAllTodos(true);
    setLists(
      lists.map((list) => ({
        ...list,
        active: false,
      }))
    );
  };

  const handleDeleteList = (id: string) => {
    // Don't delete the active list or if it's the last list
    if (lists.length <= 1) {
      toast({
        title: "Cannot delete list",
        description: "You must have at least one list.",
        variant: "destructive",
      });
      return;
    }

    const isActiveList = lists.find((list) => list.id === id)?.active;

    // If deleting active list, set a new active list
    if (isActiveList) {
      const newActiveList = lists.find((list) => list.id !== id);
      if (newActiveList) {
        setActiveList(newActiveList.id);
        setLists(
          lists
            .filter((list) => list.id !== id)
            .map((list) =>
              list.id === newActiveList.id
                ? { ...list, active: true }
                : { ...list, active: false }
            )
        );
      }
    } else {
      setLists(lists.filter((list) => list.id !== id));
    }

    toast({
      title: "List deleted",
      description: "The list and its todos have been removed.",
    });
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const handleSortChange = (method: SortMethod) => {
    setSortMethod(method);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Get all unique tags from the active list for the dropdown
  const availableTags = Array.from(
    new Set(
      todos
        .filter((todo) => {
          if (showingAllTodos) return true;
          const activeListObject = lists.find((list) => list.active);
          return activeListObject?.name.toLowerCase() === todo.tag;
        })
        .map((todo) => todo.tag)
    )
  );

  // Make sure we always have at least the active list tag available
  const activeListName =
    lists.find((list) => list.active)?.name.toLowerCase() || "life";
  if (!showingAllTodos && !availableTags.includes(activeListName)) {
    availableTags.push(activeListName);
  }

  // Filter todos based on active list and selected date
  const filteredTodos = todos.filter((todo) => {
    // If showing all todos, return all todos (no date or list filtering)
    if (showingAllTodos) {
      return true;
    }

    // Otherwise, filter by both list and date
    const activeListObject = lists.find((list) => list.active);
    const isMatchingList = todo.tag === activeListObject?.name.toLowerCase();

    // Format the selected date to match todo date format (YYYY-MM-DD)
    const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");
    const isMatchingDate = todo.date === formattedSelectedDate;

    return isMatchingList && isMatchingDate;
  });

  // Sort filtered todos based on sort method
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortMethod) {
      case "name":
        return a.title.localeCompare(b.title);
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const aPriority = a.priority || "medium";
        const bPriority = b.priority || "medium";
        return priorityOrder[aPriority] - priorityOrder[bPriority];
      case "date":
        // Sort by date (newer dates first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default:
        return 0;
    }
  });

  const { month, day } = formatDate(selectedDate);

  return (
    <div className="flex h-screen overflow-hidden">
      <TodoSidebar
        lists={lists}
        onAddList={handleAddList}
        onSelectList={handleSelectList}
        onDeleteList={handleDeleteList}
        onShowAllTodos={handleShowAllTodos}
        showingAllTodos={showingAllTodos}
      />

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-2">
              <div className="text-4xl font-medium text-todo-text-secondary">
                {month}
              </div>
              <div className="text-5xl font-bold">{day}</div>
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold">{getGreeting()}.</h2>
              <p className="text-3xl text-todo-text-secondary">
                What's your plan for today?
              </p>
            </div>
          </div>

          <TodoInput
            onAddTodo={handleAddTodo}
            availableTags={availableTags as string[]}
            currentDate={selectedDate}
          />

          <div className="space-y-2">
            {sortedTodos.length > 0 ? (
              sortedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ))
            ) : (
              <div className="text-center py-10 text-todo-text-secondary">
                No todos for this date. Add one!
              </div>
            )}
          </div>
        </div>

        <aside className="w-72 p-6 border-l border-todo-sidebar overflow-y-auto">
          <Calendar
            currentDate={currentMonth}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthChange={handleMonthChange}
          />

          <div className="h-6"></div>

          <SortOptions
            activeSort={sortMethod}
            onSortChange={handleSortChange}
            showDateSort={showingAllTodos}
          />
        </aside>
      </main>

      <TodoEdit
        todo={editingTodo}
        availableTags={availableTags as string[]}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        open={!!editingTodo}
      />
    </div>
  );
};

export default Index;
