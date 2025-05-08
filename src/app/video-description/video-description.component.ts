import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Video } from './../interfaces/video.interface';
import { VideoService } from '../services/video.service';
import { ApiService } from '../services/api.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VideoProgress } from '../interfaces/videoprogress.interface';

@Component({
  selector: 'app-video-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-description.component.html',
  styleUrl: './video-description.component.scss',
})
export class VideoDescriptionComponent implements OnInit, OnDestroy {
  videoService = inject(VideoService);
  apiService = inject(ApiService);
  currentVideo: Video | null = null;
  errorMessage: string | null = null;
  private intervalId: any;
  private currentIndex: number = 0;

  constructor() {}

  ngOnInit() {
    this.loadVideos();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async openVideoPlayer() {
    if (this.currentVideo) {
      const video = this.currentVideo;
      const token = localStorage.getItem('token');
      if (token) {
        const progress = await this.loadVideoProgress(video.id, token);
        if (progress) {
          this.applyVideoProgress(video, progress);
        }
      }
      this.videoService.selectedVideo.set(video);
      this.videoService.isPlayerOpen.set(true);
    }
  }

  async loadVideoProgress(videoId: number, token: string) {
    const progressArray: VideoProgress[] = await firstValueFrom(
      this.apiService.get(`progress/?video=${videoId}`, token)
    );
    return progressArray.length > 0 ? progressArray[0] : null;
  }

  applyVideoProgress(video: Video, progressData: VideoProgress) {
    if (progressData.last_viewed_position > 0) {
      video['startTime'] = progressData.last_viewed_position;
      this.videoService.handleVideoRestartPosition.set(true);
    }
  }

  async loadVideos() {
    const token = localStorage.getItem('token');
    const videos = await firstValueFrom(
      this.apiService.get<Video[]>('videos/', token)
    );
    if (videos.length > 0) {
      this.videoService.videos.set(videos);
      this.currentIndex = 0;
      this.currentVideo = videos[this.currentIndex];
      this.startVideoRotation();
    } else {
      this.errorMessage = 'Keine Videos verfügbar.';
    }
  }
  startVideoRotation() {
    this.intervalId = setInterval(() => {
      this.playNextVideo();
    }, 10000);
  }

  playNextVideo() {
    const videos = this.videoService.videos();
    if (videos.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % videos.length;
      this.currentVideo = videos[this.currentIndex];
    }
  }
}
