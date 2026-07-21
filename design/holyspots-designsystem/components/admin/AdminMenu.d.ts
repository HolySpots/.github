/** Admin top nav: white pills on cloud bar; selected pill fills brand blue. @startingPoint section="Admin" subtitle="Admin pill navigation bar" viewport="1200x90" */
export interface AdminMenuProps {
  items?: string[];
  selected?: string;
  onSelect?: (item: string) => void;
  userName?: string;
  assets?: string;
}
