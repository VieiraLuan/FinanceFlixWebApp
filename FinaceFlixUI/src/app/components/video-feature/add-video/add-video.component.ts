import { AlertService } from './../../../services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/dtos/Course';
import { CourseService } from 'src/app/services/course/course.service';
import { phrases } from 'src/app/shared/phrases/phrases';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css'],
})
export class AddVideoComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
      duration: [null, Validators.required],
      courseId: [null, Validators.required],
      video: [null, Validators.required],
    });

    this.title = 'Adicionar Video';

    this.retriveCourse();
  }

  title?: string;

  form!: FormGroup;

  courses: Course[] = [];

  protected addVideo() {
    if(this.validateFields()===false || this.form.invalid){
      console.log('Invalid form');
      return;
    }

    console.log('Valid form');

  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
    }
  }

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

  private getVideo(): string {
    return this.form.get('video')?.value;
  }

  private getOwner(): string {
    return window.localStorage.getItem('userEmail') || '';
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

  private validateFields():boolean{

    if(this.getName() === null || this.getName() === '' || this.getName() === undefined){
      this.alertService.showWarningAlert(phrases.writeValidName,phrases.invalidName);
      return false;
    }

    if(this.getDuration() === null || this.getDuration() === '' || this.getDuration() === undefined){
      this.alertService.showWarningAlert(phrases.writeValidDuration,phrases.invalidVideoDuration);
      return false;
    }

    if(this.getCourseId() === null || this.getCourseId() === '' || this.getCourseId() === undefined || this.getCourseId() === '0'){
      this.alertService.showWarningAlert(phrases.chooseValidCourse,phrases.invalidCourse);
      return false;
    }

    if(this.getVideo() === null || this.getVideo() === '' || this.getVideo() === undefined){
      this.alertService.showWarningAlert(phrases.uploadValidVideo,phrases.invalidVideo);
      return false;
    }

    return true;
  }


}
