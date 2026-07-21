/** Text field in the three source treatments: admin table cell, filter bar, login. */
export interface InputProps {
  label?: string;
  /** red 14px validation message under the field */
  error?: string;
  /** admin data-entry serif face (admin.less quirk) */
  serif?: boolean;
  multiline?: boolean;
  /** admin = 2px cloud border, 6px radius, blue text (default); filter = 39px high; login = gray border, 9px radius */
  variant?: 'admin' | 'filter' | 'login';
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
}
