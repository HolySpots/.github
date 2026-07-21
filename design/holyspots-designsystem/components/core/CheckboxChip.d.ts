/** Admin checkbox rendered as a toggle chip (checkbox+label pattern in admin.less). */
export interface CheckboxChipProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** 44x44 square (weekday chips Mo–Su) */
  square?: boolean;
  children?: React.ReactNode;
}
