/** Admin content table: 100px rows, cloud 1px inner borders, edge borders dropped. */
export interface DataTableProps {
  /** per-column kind: 'image' (212x100 cover), 'title' (bold, fills), 'text', 'actions' (right-aligned) */
  columns?: ('image' | 'title' | 'text' | 'actions')[];
  /** row cells: strings, or image URLs for 'image' columns, or ReactNodes for 'actions' */
  rows?: any[][];
  onRowClick?: (rowIndex: number) => void;
}
