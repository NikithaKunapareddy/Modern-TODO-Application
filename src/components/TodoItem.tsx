
import React from 'react';
import { Circle, CheckCircle, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Tag = 'life' | 'blog' | 'reminder' | string;

export interface Todo {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  tag?: Tag;
  priority?: 'high' | 'medium' | 'low';
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const tagColors = {
    life: 'bg-todo-tag-life text-todo-bg',
    blog: 'bg-todo-tag-blog text-white',
    reminder: 'bg-todo-tag-reminder text-white',
    default: 'bg-gray-500 text-white'
  };

  const getTagColor = (tag?: Tag) => {
    if (!tag) return '';
    return tagColors[tag] || tagColors.default;
  };

  const getPriorityClass = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500';
      case 'medium': return 'border-l-4 border-yellow-500';
      case 'low': return 'border-l-4 border-green-500';
      default: return '';
    }
  };

  return (
    <div 
      className={cn("bg-todo-card p-4 rounded-lg mb-3 cursor-pointer", getPriorityClass(todo.priority))}
      onClick={() => onEdit(todo)}
    >
      <div className="flex items-start gap-3">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggle(todo.id);
          }} 
          className="mt-1 flex-shrink-0"
        >
          {todo.completed ? (
            <CheckCircle className="w-5 h-5 text-todo-highlight" />
          ) : (
            <Circle className="w-5 h-5 text-todo-text-secondary" />
          )}
        </button>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <p className={cn("text-md", todo.completed && "line-through text-todo-text-secondary")}>
              {todo.title}
            </p>
            <div className="flex items-center gap-2">
              {todo.tag && (
                <span className={cn("text-xs px-2 py-0.5 rounded-full", getTagColor(todo.tag))}>
                  #{todo.tag}
                </span>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(todo.id);
                }} 
                className="text-todo-text-secondary hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(todo);
                }} 
                className="text-todo-text-secondary hover:text-todo-highlight transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-todo-text-secondary">{todo.date}</p>
          {todo.priority && (
            <p className="text-xs text-todo-text-secondary mt-1">
              Priority: {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
