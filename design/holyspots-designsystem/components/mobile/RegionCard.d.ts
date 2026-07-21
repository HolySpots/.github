/** Full-bleed 180px region row: photo, scrim, name left, pin+count right. @startingPoint section="Mobile" subtitle="Region list row with photo scrim" viewport="390x180" */
export interface RegionCardProps {
  photo: string;
  name: string;
  spotCount?: number;
  height?: number;
  onClick?: () => void;
  assets?: string;
}
