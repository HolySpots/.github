/** "Did you like this place?" 3-smile rating strip on the pale blue like-panel. */
export interface SmileRatingProps {
  /** 0 sad · 1 normal · 2 happy */
  value?: number;
  onChange?: (value: number) => void;
  assets?: string;
}
