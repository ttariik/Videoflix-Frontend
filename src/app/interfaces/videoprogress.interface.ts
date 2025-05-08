export interface VideoProgress {
  id: number;
  user: number; 
  video: number;
  last_viewed_position: number;
  viewed: boolean;
  last_viewed_at: string;
}
