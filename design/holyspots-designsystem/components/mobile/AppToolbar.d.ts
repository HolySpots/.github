/** Mobile top toolbar: opaque #f5f5f5 or fully transparent over photos. */
export interface AppToolbarProps {
  title?: string;
  /** transparent-over-photo mode with white glyphs */
  transparent?: boolean;
  onBack?: () => void;
  /** right-side glyph actions, icon = filename inside assets/icons/ */
  actions?: { icon: string; label: string; onClick?: () => void }[];
  /** relative path to the assets/ folder (default '../../assets') */
  assets?: string;
}
