import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/dtos/Course';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CourseService } from 'src/app/services/course/course.service';
import { phrases } from 'src/app/shared/phrases/phrases';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.title = 'Cursos';
    this.retriveCourses();
  }

  title?: string;

  form!: FormGroup;

  courses: Course[] = [];

  selectedIds: string[] = [];

  protected addCourse() {
    this.router.navigate(['/course/add']);
  }

  protected editCourse() {
    if (this.selectedIds.length === 0) {
      this.alertService.showWarningAlert(
        phrases.selectAtLeastOne,
        phrases.warning
      );
      return;
    }

    this.router.navigate(['course/edit/', this.selectedIds[0]]);
    this.selectedIds = [];
  }

  protected select(id?: string) {
    if (!id) {
      return;
    }
    this.selectedIds.push(id);
  }

  protected deleteCourse() {
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

          this.alertService.showSuccessAlert(
            phrases.categoryDeleted,
            phrases.sucess
          );

          window.location.reload();
          this.alertService.closeAlert();
        }
      );
    }
  }

  private getOwner(): string {
    return window.localStorage.getItem('userEmail') || '';
  }

  private retriveCourses() {
    const course: Course = {
      dono: this.getOwner(),
    };

    this.courseService.retrieveCoursesByOwner(course).subscribe({
      next: (response) => {
        this.courses = response;

      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
