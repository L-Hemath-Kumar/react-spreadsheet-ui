import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Cell from './Cell';
import { TableRow, Column, SortConfig } from '../types/table';

interface TableProps {
  data: TableRow[];
  columns: Column[];
  onCellEdit: (rowId: number, field: keyof TableRow, value: string) => void;
  hiddenColumns: Set<string>;
}

interface FocusedCell {
  row: number;
  col: number;
}

const Table: React.FC<TableProps> = ({ data, columns, onCellEdit, hiddenColumns }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
  const [focusedCell, setFocusedCell] = useState<FocusedCell>({ row: 0, col: 0 });
  
  // Create refs for all cells in a 2D array
  const cellRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

  // Get visible columns (excluding hidden ones)
  const visibleColumns = columns.filter(col => !hiddenColumns.has(String(col.key)));
  
  // Total rows including data rows and empty rows
  const totalRows = data.length + 15; // 15 empty rows as in original

  // Initialize cell refs array
  useEffect(() => {
    cellRefs.current = Array(totalRows).fill(null).map(() => 
      Array(visibleColumns.length).fill(null)
    );
  }, [totalRows, visibleColumns.length]);

  // Set initial focus to first cell on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setFocusedCell({ row: 0, col: 0 });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSort = useCallback((columnKey: keyof TableRow) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key: columnKey, direction });
    console.log(`Sort by: ${String(columnKey)} ${direction}`);
  }, [sortConfig]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof TableRow];
      const bValue = b[sortConfig.key as keyof TableRow];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const { row: currentRow, col: currentCol } = focusedCell;
    let newRow = currentRow;
    let newCol = currentCol;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newRow = Math.max(0, currentRow - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newRow = Math.min(totalRows - 1, currentRow + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newCol = Math.max(0, currentCol - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newCol = Math.min(visibleColumns.length - 1, currentCol + 1);
        break;
      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) {
          // Shift+Tab: move backwards
          if (currentCol > 0) {
            newCol = currentCol - 1;
          } else if (currentRow > 0) {
            newRow = currentRow - 1;
            newCol = visibleColumns.length - 1;
          }
        } else {
          // Tab: move forwards
          if (currentCol < visibleColumns.length - 1) {
            newCol = currentCol + 1;
          } else if (currentRow < totalRows - 1) {
            newRow = currentRow + 1;
            newCol = 0;
          }
        }
        break;
      default:
        return;
    }

    // Only proceed if the position actually changed
    if (newRow !== currentRow || newCol !== currentCol) {
      setFocusedCell({ row: newRow, col: newCol });
    }
  }, [focusedCell, totalRows, visibleColumns.length]);

  // Set cell ref
  const setCellRef = useCallback((rowIndex: number, colIndex: number) => {
    return (el: HTMLDivElement | null) => {
      if (cellRefs.current[rowIndex]) {
        cellRefs.current[rowIndex][colIndex] = el;
      }
    };
  }, []);

  // Handle cell click to update focus
  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    setFocusedCell({ row: rowIndex, col: colIndex });
  }, []);

  const renderHeaderCell = (column: Column, colIndex: number) => {
    if (hiddenColumns.has(String(column.key))) {
      return null;
    }

    const isActive = sortConfig.key === column.key;
    
    return (
      <th 
        key={String(column.key)}
        className={`px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50 ${column.width || ''} select-none`}
      >
        <div className="flex items-center space-x-1">
          <span>{column.label}</span>
          {column.sortable && (
            <button 
              onClick={() => handleSort(column.key as keyof TableRow)}
              className="hover:bg-gray-200 rounded p-1 transition-colors"
            >
              {isActive && sortConfig.direction === 'desc' ? (
                <ChevronUp className="w-3 h-3 text-gray-600" />
              ) : (
                <ChevronDown className="w-3 h-3 text-gray-600" />
              )}
            </button>
          )}
        </div>
      </th>
    );
  };

  const renderCell = (row: TableRow | null, column: Column, rowIndex: number, colIndex: number) => {
    if (hiddenColumns.has(String(column.key))) {
      return null;
    }

    const key = column.key;
    const isFocused = focusedCell.row === rowIndex && focusedCell.col === colIndex;
    
    if (key === '#') {
      return (
        <td key={`${rowIndex}-${String(key)}`} className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 bg-gray-50 w-12">
          <div
            ref={setCellRef(rowIndex, colIndex)}
            tabIndex={0}
            className={`px-1 py-1 rounded focus:outline-none transition-all duration-150 ${
              isFocused 
                ? 'ring-2 ring-blue-500 bg-blue-100 shadow-sm' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onKeyDown={handleKeyDown}
          >
            {rowIndex + 1}
          </div>
        </td>
      );
    }

    // For empty rows (beyond data length)
    if (!row) {
      return (
        <td key={`empty-${rowIndex}-${String(key)}`} className="border-r border-gray-200 border-b border-gray-100">
          <div
            ref={setCellRef(rowIndex, colIndex)}
            tabIndex={0}
            className={`px-3 py-2 h-10 focus:outline-none transition-all duration-150 cursor-pointer ${
              isFocused 
                ? 'ring-2 ring-blue-500 bg-blue-100 shadow-sm' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onKeyDown={handleKeyDown}
          >
          </div>
        </td>
      );
    }

    const value = row[key as keyof TableRow];
    const cellType = key === 'status' ? 'status' : 
                    key === 'priority' ? 'priority' : 
                    key === 'url' ? 'url' : 'text';

    return (
      <td key={`${row.id}-${String(key)}`} className="border-r border-gray-200 border-b border-gray-100">
        <Cell
          ref={setCellRef(rowIndex, colIndex)}
          value={value}
          type={cellType}
          editable={column.editable}
          isFocused={isFocused}
          onFocus={() => handleCellClick(rowIndex, colIndex)}
          onEdit={(newValue) => onCellEdit(row.id, key as keyof TableRow, newValue)}
          onKeyDown={handleKeyDown}
        />
      </td>
    );
  };

  // Generate empty rows for spreadsheet-like appearance
  const allRows = [
    ...sortedData,
    ...Array(15).fill(null)
  ];

  return (
    <div 
      className="overflow-auto h-full"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <table ref={tableRef} className="min-w-full bg-white">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-gray-200">
            {visibleColumns.map((column, colIndex) => renderHeaderCell(column, colIndex))}
          </tr>
        </thead>
        <tbody>
          {allRows.map((row, rowIndex) => (
            <tr key={row?.id || `empty-${rowIndex}`} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
              {visibleColumns.map((column, colIndex) => renderCell(row, column, rowIndex, colIndex))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;