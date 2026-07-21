/** Color-coded admin action button (59px tall, 7px radius). @startingPoint section="Core" subtitle="HolySpots color-coded action button" viewport="700x260" */
export interface ButtonProps {
  /** primary = brand blue fill; save = #47bfed fill; secondary = cloud bg + blue text (add/edit); cancel = cloud bg + coral text; delete = coral fill */
  variant?: 'primary' | 'save' | 'secondary' | 'cancel' | 'delete';
  /** lg = 59px admin/desktop (default); md = 44px compact/touch */
  size?: 'lg' | 'md';
  /** URL of a left glyph (use assets/admin-icons/*) — left-aligns the label like .btn-img */
  icon?: string;
  fullWidth?: boolean;
  /** fixed 184px width like admin .btn */
  fixedWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}
