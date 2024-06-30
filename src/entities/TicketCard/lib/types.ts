export type TicketCardProps = {
  id: string;
  title: string;
  description: string;
  rating?: number;
  poster: string;
  genre: string;
  release_year: number;
  director?: string;
  type?: "full" | "short";
};
