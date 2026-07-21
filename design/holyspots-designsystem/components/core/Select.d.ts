/** Admin dropdown: serif face, blue text, custom arrow glyph. */
export interface SelectProps {
  options?: string[];
  /** compact blue-filled variant (times editor): white text, 44px */
  filled?: boolean;
  value?: string;
  onChange?: (e: any) => void;
}
