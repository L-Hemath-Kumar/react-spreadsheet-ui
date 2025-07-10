export interface TableRow {
  id: number;
  jobRequest: string;
  submitted: string;
  status: 'In-process' | 'Need to start' | 'Complete' | 'Blocked';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Column {
  key: keyof TableRow | '#';
  label: string;
  width?: string;
  sortable?: boolean;
  editable?: boolean;
  resizable?: boolean;
  hidden?: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: keyof TableRow | null;
  direction: SortDirection;
}