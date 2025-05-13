
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
}

const Calendar = ({ currentDate, selectedDate, onDateSelect, onMonthChange }: CalendarProps) => {
  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get first day of month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = 
        date.getDate() === selectedDate.getDate() && 
        date.getMonth() === selectedDate.getMonth() && 
        date.getFullYear() === selectedDate.getFullYear();
      
      const isToday = 
        date.getDate() === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear();
      
      days.push(
        <button 
          key={`day-${day}`}
          onClick={() => onDateSelect(date)}
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full text-sm",
            isSelected && "bg-todo-yellow text-todo-bg font-medium",
            !isSelected && isToday && "bg-muted text-todo-text-primary",
            !isSelected && !isToday && "hover:bg-muted"
          )}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };
  
  // Format month name
  const monthName = currentDate.toLocaleString('default', { month: 'short' });
  
  return (
    <div className="bg-todo-bg p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => onMonthChange('prev')} className="text-todo-text-secondary hover:text-todo-text-primary">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm">{year}</span>
          <button onClick={() => onMonthChange('next')} className="text-todo-text-secondary hover:text-todo-text-primary">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="font-medium">
          {monthName}
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-xs text-todo-text-secondary">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
