import { Injectable, signal } from '@angular/core';
import { Video } from './../interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  videos = signal<Video[]>([]);
  selectedVideo = signal<Video | null>(null);
  isPlayerOpen = signal<boolean>(false);
  handleVideoRestartPosition = signal<boolean>(false);
}
