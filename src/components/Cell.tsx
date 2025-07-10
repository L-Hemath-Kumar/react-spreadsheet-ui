import React, { useState, useRef, useEffect, forwardRef } from 'react';

interface CellProps {
  value: string | number;
  editable?: boolean;
  type?: 'text' | 'status' | 'priority' | 'url';
  onEdit?: (value: string) => void;
  className?: string;
  isFocused?: boolean;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const Cell = forwardRef<HTMLDivElement, CellProps>(({ 
  value, 
  editable = false, 
  type = 'text', 
  onEdit, 
  className = '',
  isFocused = false,
  onFocus,
  onKeyDown
}, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(String(value));
  }, [value]);

  const handleDoubleClick = () => {
    if (editable) {
      setIsEditing(true);
      setEditValue(String(value));
    }
  };

  const handleClick = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isEditing) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsEditing(false);
        setEditValue(String(value));
      }
      // Don't propagate other keys when editing
      e.stopPropagation();
    } else {
      // Start editing on Enter or F2
      if ((e.key === 'Enter' || e.key === 'F2') && editable) {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
        setEditValue(String(value));
      } else if (onKeyDown) {
        onKeyDown(e);
      }
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onEdit && editValue !== String(value)) {
      onEdit(editValue);
    }
  };

  const renderStatusBadge = (status: string) => {
    const statusColors = {
      'In-process': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Need to start': 'bg-blue-100 text-blue-800 border-blue-200',
      'Complete': 'bg-green-100 text-green-800 border-green-200',
      'Blocked': 'bg-red-100 text-red-800 border-red-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status}
      </span>
    );
  };

  const renderPriorityBadge = (priority: string) => {
    const priorityColors = {
      'High': 'text-red-600 font-bold',
      'Medium': 'text-yellow-600 font-medium',
      'Low': 'text-green-600 font-medium',
    };

    const priorityLabels = {
      'High': 'H',
      'Medium': 'Me',
      'Low': 'L',
    };

    return (
      <span className={`text-sm ${priorityColors[priority as keyof typeof priorityColors] || 'text-gray-600'}`}>
        {priorityLabels[priority as keyof typeof priorityLabels] || priority}
      </span>
    );
  };

  const renderUrl = (url: string) => {
    return (
      <a 
        href={url.startsWith('http') ? url : `https://${url}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-32 block transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {url}
      </a>
    );
  };

  if (isEditing) {
    return (
      <div className="relative">
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-1 text-sm border-2 border-blue-500 rounded focus:outline-none bg-white"
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`px-3 py-2 text-sm cursor-pointer transition-all duration-150 focus:outline-none ${
        isFocused 
          ? 'ring-2 ring-blue-500 bg-blue-100 shadow-sm' 
          : 'hover:bg-gray-50'
      } ${className}`}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {type === 'status' && renderStatusBadge(String(value))}
      {type === 'priority' && renderPriorityBadge(String(value))}
      {type === 'url' && renderUrl(String(value))}
      {type === 'text' && <span className="text-gray-900">{value}</span>}
    </div>
  );
});

Cell.displayName = 'Cell';

export default Cell;