export interface Video {
  id: number;
  title: string;
  description: string;
  video_file: string;
  video_120p: string;
  video_360p: string;
  video_720p: string;
  video_1080p: string;
  category: string;
  created_at: string;
  startTime?: number;
}
