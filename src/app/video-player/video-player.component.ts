import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
  OnDestroy,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { VideoService } from '../services/video.service';

import Hls from 'hls.js';
import { ApiService } from '../services/api.service';
import { VideoProgress } from '../interfaces/videoprogress.interface';
import { Video } from '../interfaces/video.interface';

interface QualityOption {
  label: string;
  src: string;
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  videoService = inject(VideoService);
  apiService = inject(ApiService);
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  currentQualityLabel = 'Auto';
  showQualityMenu = false;
  availableQualities: QualityOption[] = [];
  userToken: string | null = null;
  videoId: number = 0;
  showButtons = true;

  constructor() {
    // window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  handleBeforeUnload(event: Event) {
    this.saveProgress();
  }

  ngAfterViewInit() {
    const selectedVideo = this.videoService.selectedVideo();
    if (selectedVideo) {
      this.availableQualities = [
        { label: '1080p', src: selectedVideo.video_1080p },
        { label: '720p', src: selectedVideo.video_720p },
        { label: '360p', src: selectedVideo.video_360p },
        { label: '120p', src: selectedVideo.video_120p },
      ];
      this.loadVideoBasedOnResolution(selectedVideo);

      if (selectedVideo['startTime']) {
        const videoElement = this.videoPlayer.nativeElement;
        videoElement.onloadedmetadata = () => {
          videoElement.currentTime = selectedVideo['startTime'] || 0;
        };
      }
    }
    this.userToken = localStorage.getItem('token');
  }

  loadVideoBasedOnResolution(selectedVideo: any) {
    const width = screen.width;
    let selectedResolution: QualityOption;

    if (this.currentQualityLabel === 'Auto') {
      if (width <= 480) {
        selectedResolution = this.availableQualities.find(
          (q) => q.label === '120p'
        )!;
      } else if (width <= 768) {
        selectedResolution = this.availableQualities.find(
          (q) => q.label === '360p'
        )!;
      } else if (width <= 1366) {
        selectedResolution = this.availableQualities.find(
          (q) => q.label === '720p'
        )!;
      } else {
        selectedResolution = this.availableQualities.find(
          (q) => q.label === '1080p'
        )!;
      }
    } else {
      selectedResolution = this.availableQualities.find(
        (q) => q.label === this.currentQualityLabel
      )!;
    }

    const videoUrl = selectedResolution
      ? selectedResolution.src
      : selectedVideo.video_720p;
    this.loadVideo(videoUrl);
  }

  loadVideo(url: string) {
    const videoElement = this.videoPlayer.nativeElement;
    if (Hls.isSupported() && url.endsWith('.m3u8')) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoElement);
    } else {
      videoElement.src = url;
    }
    videoElement.load();
  }

  startVideo() {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.play();
    this.showButtons = false;
  }

  continueVideo() {
    const selectedVideo = this.videoService.selectedVideo();
    if (selectedVideo && selectedVideo['startTime']) {
      const videoElement = this.videoPlayer.nativeElement;
      videoElement.currentTime = selectedVideo['startTime'];
      videoElement.play();
      this.showButtons = false;
    }
  }

  restartVideo() {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.currentTime = 0;
    videoElement.play();
    this.showButtons = false;
  }

  toggleQualityMenu() {
    this.showQualityMenu = !this.showQualityMenu;
  }

  changeQuality(quality: QualityOption) {
    this.showQualityMenu = false;
    const videoElement = this.videoPlayer.nativeElement;
    const currentTime = videoElement.currentTime;
    const wasPlaying = !videoElement.paused;
    this.setVideoSource(videoElement, quality);
    this.restorePlaybackPosition(videoElement, currentTime, wasPlaying);
  }

  private setVideoSource(
    videoElement: HTMLVideoElement,
    quality: QualityOption
  ) {
    videoElement.src =
      quality.label === 'Auto' ? this.availableQualities[0].src : quality.src;
    this.currentQualityLabel = quality.label;
    videoElement.load();
  }

  private restorePlaybackPosition(
    videoElement: HTMLVideoElement,
    time: number,
    wasPlaying: boolean
  ) {
    videoElement.onloadedmetadata = () => (videoElement.currentTime = time);
    setTimeout(() => {
      if (videoElement.currentTime === 0) videoElement.currentTime = time;
    }, 100);
    videoElement.oncanplay = () =>
      wasPlaying && videoElement.play().catch(console.error);
  }

  closePlayer() {
    this.saveProgress();
    this.videoService.isPlayerOpen.set(false);
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.pause();
  }

  rewindVideo() {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
  }

  fastForwardVideo() {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.currentTime = Math.min(
      videoElement.duration,
      videoElement.currentTime + 10
    );
  }

  async saveProgress() {
    const videoElement = this.videoPlayer.nativeElement;
    const currentTime = videoElement.currentTime;
    const postData = {
      video: this.videoService.selectedVideo()?.id,
      last_viewed_position: currentTime,
      viewed: currentTime >= videoElement.duration,
    };
    const token = localStorage.getItem('token');
    if (token) {
      await firstValueFrom(this.apiService.post(postData, 'progress/', token));
    }
  }

  ngOnDestroy() {
    this.saveProgress();
  }
}
