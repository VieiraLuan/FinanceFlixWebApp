import { VideoService } from 'src/app/services/video/video.service';
import { UtilsService } from './../../../shared/utils.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/dtos/Course';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CourseService } from 'src/app/services/course/course.service';
import { phrases } from 'src/app/shared/phrases/phrases';
import { Video } from 'src/app/dtos/Video';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css'],
})
export class EditVideoComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private alertService: AlertService,
    private courseService: CourseService,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
      duration: [null, Validators.required],
      courseId: [null, Validators.required],

    });

    this.activatedRoute.params.subscribe((params) => {
      this.videoIdFromRoute = params['id'];
    });
    this.retriveCourse();

    if (this.courses !== undefined) {
      this.retrieveVideo();
    }
  }

  form!: FormGroup;
  videoIdFromRoute: string = '';
  title: string = 'Editar Video';
  videoFile: string = '';
  courses: Course[] = [];
  video!: Video;
  courseSelected: Course = {};



  private getName(): string {
    return this.form.get('name')?.value;
  }

  private getDescription(): string {
    return this.form.get('description')?.value;
  }

  private getDuration(): string {
    return this.form.get('duration')?.value;
  }

  private getCourseId(): string {
    return this.form.get('courseId')?.value;
  }

  private getOwner(): string {
    return window.localStorage.getItem('userEmail') || '';
  }

  protected editVideo() {
    if(!this.validateFields() || this.form.invalid) {
      return;
    }

    const video: Video = {
      id: this.videoIdFromRoute,
      nome: this.getName(),
      descricao: this.getDescription(),
      duracaoSegundos: this.getDuration(),
      cursoId: this.getCourseId(),
    };

    console.log(video);

    // Chamar serviço edit video

  }

  private validateFields(): boolean {
    if (
      this.getName() === null ||
      this.getName() === '' ||
      this.getName() === undefined
    ) {
      this.alertService.showWarningAlert(
        phrases.writeValidName,
        phrases.invalidName
      );
      return false;
    }

    if (
      this.getDuration() === null ||
      this.getDuration() === '' ||
      this.getDuration() === undefined
    ) {
      this.alertService.showWarningAlert(
        phrases.writeValidDuration,
        phrases.invalidVideoDuration
      );
      return false;
    }

    if (
      this.getCourseId() === null ||
      this.getCourseId() === '' ||
      this.getCourseId() === undefined ||
      this.getCourseId() === '0'
    ) {
      this.alertService.showWarningAlert(
        phrases.chooseValidCourse,
        phrases.invalidCourse
      );
      return false;
    }

    return true;
  }

  private retriveCourse() {
    const course: Course = {
      dono: this.getOwner(),
    };

    this.courseService.retrieveCoursesByOwner(course).subscribe({
      next: (response) => {
        response.forEach((element) => {
          this.courses.push(element);
        });
      },
      error: (error: any) => {
        console.error('Error retrieving courses', error);
      },
    });
  }

  private retrieveVideo() {
    this.videoService.getVideoById(this.videoIdFromRoute).subscribe({
      next: (response) => {
        this.video = response;
        this.form.get('name')?.setValue(this.video.nome);
        this.form.get('description')?.setValue(this.video.descricao);
        this.form.get('duration')?.setValue(this.video.duracaoSegundos);
        this.form.get('courseId')?.setValue(this.video.cursoId);

        this.courses.forEach((element) => {
          if (this.video.cursoId === element.id) {
            const courseFound: Course = {
              id: element.id,
              nome: element.nome,
              descricao: element.descricao,
              dono: element.dono,
            };

            this.courseSelected = courseFound;
          }
        });
      },
      error: (error: any) => {
        console.error('Error retrieving video', error);
      },
    });
  }
}
