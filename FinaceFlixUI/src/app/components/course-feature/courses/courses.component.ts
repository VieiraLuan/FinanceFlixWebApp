import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/dtos/Course';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  constructor(
    private formGroup: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
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
    this.router.navigate(['/course/edit/', '1']);
    // this.router.navigate(['/category/edit/', this.selectedIds[0]]);
  }

  protected deleteCourse() {
    console.log('Course deleted');
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
