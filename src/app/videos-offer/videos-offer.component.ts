import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { VideoDescriptionComponent } from '../video-description/video-description.component';
import { ApiService } from './../services/api.service';
import { Video } from './../interfaces/video.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CapitalizeFirstPipe } from './../capitalize-first.pipe';
import { VideoService } from '../services/video.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { VideoProgress } from '../interfaces/videoprogress.interface';

@Component({
  selector: 'app-videos-offer',
  standalone: true,
  imports: [
    VideoDescriptionComponent,
    CommonModule,
    FormsModule,
    CapitalizeFirstPipe,
    VideoPlayerComponent,
  ],
  templateUrl: './videos-offer.component.html',
  styleUrl: './videos-offer.component.scss',
})
export class VideosOfferComponent implements OnInit {
  videoService = inject(VideoService);
  apiService = inject(ApiService);
  errorMessage: string | null = null;
  categories: string[] = [];
  userProgress: VideoProgress[] = [];
  isPlayerOpen = this.videoService.isPlayerOpen;

  constructor() {
    effect(() => {
      const playerIsOpen = this.isPlayerOpen();
      if (!playerIsOpen) {
        this.ngOnInit();
      }
    });
  }

  async ngOnInit() {
    this.loadVideos();
    await this.loadUserProgress();
  }

  async loadVideos() {
    const token = localStorage.getItem('token');
    const videos = await firstValueFrom(
      this.apiService.get<Video[]>('videos/', token)
    );
    this.videoService.videos.set(videos);
    this.extractCategories();
  }

  async loadUserProgress() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userProgress = await firstValueFrom(
        this.apiService.get<VideoProgress[]>('progress/', token)
      );
      this.extractCategories();
    }
  }

  getContinueWatchingVideos(): Video[] {
    const continueVideos = this.videoService
      .videos()
      .filter((video) =>
        this.userProgress.some(
          (progress) =>
            progress.video === video.id && progress.last_viewed_position > 0
        )
      );
    return continueVideos.sort((a, b) => {
      const progressA = this.userProgress.find((p) => p.video === a.id);
      const progressB = this.userProgress.find((p) => p.video === b.id);
      const dateA = progressA
        ? new Date(progressA.last_viewed_at).getTime()
        : 0;
      const dateB = progressB
        ? new Date(progressB.last_viewed_at).getTime()
        : 0;
      return dateB - dateA;
    });
  }

  extractCategories() {
    const categorySet = new Set<string>();
    this.videoService
      .videos()
      .forEach((video) => categorySet.add(video.category));
    this.categories = Array.from(categorySet);

    if (this.getContinueWatchingVideos().length > 0) {
      this.categories.unshift('My List');
    }
  }

  getVideosByCategory(category: string): Video[] {
    if (category === 'My List') {
      return this.getContinueWatchingVideos();
    }
    const filteredVideos = this.videoService
      .videos()
      .filter((video) => video.category === category);
    return [...filteredVideos];
  }

  scrollLeft(category: string) {
    const container = document.getElementById('videos-' + category);
    if (container) {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      container.scrollBy({ left: -200, behavior: 'smooth' });
      setTimeout(() => {
        if (container.scrollLeft <= 0) {
          container.scrollLeft = scrollWidth;
        }
      }, 300);
    }
  }

  scrollRight(category: string) {
    const container = document.getElementById('videos-' + category);
    if (container) {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      container.scrollBy({ left: 200, behavior: 'smooth' });
      setTimeout(() => {
        if (container.scrollLeft >= scrollWidth - clientWidth) {
          container.scrollLeft = scrollWidth / 3 - clientWidth;
        }
      }, 300);
    }
  }

  async openVideoPlayer(video: Video) {
    const token = localStorage.getItem('token');
    if (token) {
      const progressArray: VideoProgress[] = await firstValueFrom(
        this.apiService.get(`progress/?video=${video.id}`, token)
      );
      if (progressArray.length > 0) {
        const progressData = progressArray[0];
        if (progressData.last_viewed_position > 0) {
          video['startTime'] = progressData.last_viewed_position;
          this.videoService.handleVideoRestartPosition.set(true);
        }
      }
    }
    this.videoService.selectedVideo.set(video);
    this.videoService.isPlayerOpen.set(true);
  }
}
