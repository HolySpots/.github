/** Bottom 50px check-in bar: blue CHECK IN, or white YOU WERE HERE + DELETE. */
export interface CheckInBarProps {
  checkedIn?: boolean;
  onCheckIn?: () => void;
  onDelete?: () => void;
  assets?: string;
}
