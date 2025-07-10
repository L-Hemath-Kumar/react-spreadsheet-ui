import React, { useState, useCallback } from 'react';
import Table from './Table';
import Toolbar from './Toolbar';
import { TableRow, Column } from '../types/table';

const Spreadsheet: React.FC = () => {
  const [data, setData] = useState<TableRow[]>([
    {
      id: 1,
      jobRequest: 'Launch social media campaign for pro...',
      submitted: '15-11-2024',
      status: 'In-process',
      submitter: 'Aisha Patel',
      url: 'www.aishapatel...',
      assigned: 'Sophie Choudhury',
      priority: 'Medium'
    },
    {
      id: 2,
      jobRequest: 'Update press kit for company redesign',
      submitted: '28-10-2024',
      status: 'Need to start',
      submitter: 'Irfan Khan',
      url: 'www.irfankhanp...',
      assigned: 'Tejas Pandey',
      priority: 'High'
    },
    {
      id: 3,
      jobRequest: 'Finalize user testing feedback for app...',
      submitted: '05-12-2024',
      status: 'In-process',
      submitter: 'Mark Johnson',
      url: 'www.markjohns...',
      assigned: 'Rachel Lee',
      priority: 'Medium'
    },
    {
      id: 4,
      jobRequest: 'Design new features for the website',
      submitted: '10-01-2025',
      status: 'Complete',
      submitter: 'Emily Green',
      url: 'www.emilygreen...',
      assigned: 'Tom Wright',
      priority: 'Low'
    },
    {
      id: 5,
      jobRequest: 'Prepare financial report for Q4',
      submitted: '25-01-2025',
      status: 'Blocked',
      submitter: 'Jessica Brown',
      url: 'www.jessicabro...',
      assigned: 'Kevin Smith',
      priority: 'Low'
    }
  ]);

  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());

  const columns: Column[] = [
    { key: '#', label: '#', width: 'w-12' },
    { key: 'jobRequest', label: 'Job Request', editable: true, sortable: true, resizable: true },
    { key: 'submitted', label: 'Submitted', sortable: true, resizable: true },
    { key: 'status', label: 'Status', sortable: true, resizable: true },
    { key: 'submitter', label: 'Submitter', sortable: true, resizable: true },
    { key: 'url', label: 'URL', sortable: true, resizable: true },
    { key: 'assigned', label: 'Assigned', sortable: true, resizable: true },
    { key: 'priority', label: 'Priority', sortable: true, resizable: true }
  ];

  const handleCellEdit = useCallback((rowId: number, field: keyof TableRow, value: string) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
    console.log(`Cell edited: Row ${rowId}, Field ${field}, New value: ${value}`);
  }, []);

  const handleHideFields = useCallback(() => {
    // Toggle visibility of a sample column for demonstration
    const columnToToggle = 'url';
    setHiddenColumns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(columnToToggle)) {
        newSet.delete(columnToToggle);
        console.log(`Column ${columnToToggle} shown`);
      } else {
        newSet.add(columnToToggle);
        console.log(`Column ${columnToToggle} hidden`);
      }
      return newSet;
    });
  }, []);

  const handleSort = useCallback(() => {
    console.log('Sort functionality triggered from toolbar');
  }, []);

  const handleFilter = useCallback(() => {
    console.log('Filter functionality triggered from toolbar');
  }, []);

  return (
    <div className="flex-1 bg-white flex flex-col">
      <Toolbar 
        onHideFields={handleHideFields}
        onSort={handleSort}
        onFilter={handleFilter}
      />
      <div className="flex-1 overflow-hidden">
        <Table 
          data={data} 
          columns={columns} 
          onCellEdit={handleCellEdit}
          hiddenColumns={hiddenColumns}
        />
      </div>
    </div>
  );
};

export default Spreadsheet;