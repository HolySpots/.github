/** Spot list row: 120px photo, 2-line name, gray info, status + check-in flag. */
export interface SpotListItemProps {
  photo?: string;
  name: string;
  info?: string;
  status?: 'open' | 'closed';
  checkedIn?: boolean;
  onClick?: () => void;
  assets?: string;
}
