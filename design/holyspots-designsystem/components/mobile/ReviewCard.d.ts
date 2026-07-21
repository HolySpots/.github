/** Review row: "smile at spot" title, quoted light text, 80px photo strip. */
export interface ReviewCardProps {
  /** e.g. a rating + place: review_title_format "%s at %s" */
  title: string;
  text: string;
  date?: string;
  photos?: string[];
  assets?: string;
}
