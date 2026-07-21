/** 44px square icon button (admin .btn-remove / .btn-approve). */
export interface IconButtonProps {
  /** glyph URL from assets/admin-icons/ or assets/icons/ */
  icon: string;
  /** accessible label */
  label: string;
  /** cloud background instead of white+border */
  filled?: boolean;
  onClick?: () => void;
}
