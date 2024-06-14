import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/dtos/Course';
import { HomeList } from 'src/app/dtos/HomeList';
import { VideoService } from 'src/app/services/video/video.service';
import { Video } from 'src/app/dtos/Video';
import { AlertService } from 'src/app/services/alert/alert.service';
import { phrases } from 'src/app/shared/phrases/phrases';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.courseIdFromRoute = params['courseid'];
    });

    this.retrieveVideoList();
  }

  courseIdFromRoute: string = '';

  videoList: Video[] = [];

  private retrieveVideoList(): void {
    this.alertService.showLoadingAlert('Carregando vídeos');

    this.videoService.getVideosByCourseId(this.courseIdFromRoute).subscribe({
      next: (response) => {
        if (response !== null) {
          this.videoList = response;
          this.alertService.closeAlert();
        }
      },
      error: (error) => {
        console.error(error);
        this.alertService.showErrorAlert(
          'Erro ao carregar vídeos',
          phrases.error
        );
      },
    });
  }

  protected openVideo(videoId: string,videoname:string) {
    this.router.navigate(['video/list/player', videoId,videoname]);
  }

  // id:string;
  // nome: string;
  // descricao: string;
  // dono: string;
  // curso: Course[];
}
