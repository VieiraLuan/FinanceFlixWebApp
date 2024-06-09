import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CourseService } from 'src/app/services/course/course.service';
import { VideoService } from 'src/app/services/video/video.service';
import { phrases } from 'src/app/shared/phrases/phrases';
import { Video } from 'src/app/dtos/Video';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private courseService: CourseService,
    private videoService: VideoService
  ) {}

  title?: string;
  selectedIds: string[] = [];
  videos:Video[] = [{
    CursoId: '',
    Id: '',
    Nome: '',
    Descricao: '',
    Url: '',
    DuracaoSegundos: '0',
    FilePath: '',
    Dono: '',
  }];

  ngOnInit(): void {
    this.title = 'Videos';
    this.retriveVideo();
  }

  protected addVideo() {
    this.router.navigate(['/video/add']);
  }

  protected editVideo() {
    if (this.selectedIds.length === 0) {
      this.alertService.showWarningAlert(
        phrases.selectAtLeastOne,
        phrases.warning
      );
      return;
    }

    this.router.navigate(['video/edit/', this.selectedIds[0]]);
    this.selectedIds = [];
    return;
  }

  protected select(id?: string) {
    if (!id) {
      return;
    }
    this.selectedIds.push(id);
  }

  protected deleteVideo() {
    if (this.selectedIds.length === 0) {
      this.alertService.showWarningAlert(
        phrases.selectAtLeastOne,
        phrases.warning
      );
      return;
    } else {
      this.alertService.showConfirmAlert(
        phrases.warning,
        phrases.confirmDeleteCategory,
        phrases.yes,
        phrases.no,
        () => {
          //alterar para video
          this.selectedIds.forEach((id) => {
            this.courseService.deleteCourse(id).subscribe({
              next: () => {
                console.log('Course deleted' + id);
              },
              error: (error: any) => {
                console.error('Error deleting Course', error);
              },
            });
          });

          this.selectedIds = [];

          //alterar para video
          this.alertService.showSuccessAlert(
            phrases.categoryDeleted,
            phrases.sucess
          );

          //alterar para video
          window.location.reload();
          this.alertService.closeAlert();
        }
      );
    }
  }

  private getOwner(): string {
    return window.localStorage.getItem('userEmail') || '';
  }

  private retriveVideo() {
    const video: Video = {
      CursoId: '',
      Id: '',
      Nome: '',
      Descricao: '',
      Url: '',
      DuracaoSegundos: '',
      FilePath: '',
      Dono: this.getOwner(),
    };

    // this.videoService.retrieveCoursesByOwner(video).subscribe({
    //   next: (response) => {
    //     this.videos = [];
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   },
    // });
  }
}
