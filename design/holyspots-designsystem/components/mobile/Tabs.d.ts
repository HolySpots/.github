/** 50px top tab row (Spots | Guides) with vertical divider and shadow under. */
export interface TabsProps {
  tabs?: string[];
  active?: number;
  onChange?: (index: number) => void;
}
