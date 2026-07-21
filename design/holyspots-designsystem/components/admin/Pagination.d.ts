/** Plain numeric pagination; active page is bold. */
export interface PaginationProps {
  pages?: number;
  active?: number;
  onChange?: (page: number) => void;
}
