import { AlertService } from './../../services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/dtos/Category';
import { CategoryRequest } from 'src/app/dtos/CategoryRequest';
import { CategoryResponse } from 'src/app/dtos/CategoryResponse';
import { Course } from 'src/app/dtos/Course';
import { HomeList } from 'src/app/dtos/HomeList';
import { CategoryService } from 'src/app/services/category/category.service';
import { CourseService } from 'src/app/services/course/course.service';
import { phrases } from 'src/app/shared/phrases/phrases';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private courseService: CourseService,
    private categoryService: CategoryService
  ) {}

  form!: FormGroup;
  homeList: HomeList[] = [];
  cacheFromList: HomeList[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: [null],
    });

    this.search();
  }

  private getSearchText() {
    return this.form.get('search');
  }

  private find() {
    this.alertService.showLoadingAlert(phrases.searching);

    this.courseService.retrieveAllCourses().subscribe({
      next: (response) => {
        this.cacheFromList = response;

        if (this.cacheFromList.length === 0) {
          this.alertService.showWarningAlert(
            phrases.noResultsFound,
            phrases.warning
          );
        } else {
          this.homeList = this.cacheFromList;
          this.alertService.closeAlert();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  protected search() {
    if (
      this.getSearchText()!.value === null ||
      this.getSearchText()!.value === undefined ||
      this.getSearchText()!.value === ''
    ) {
      console.log('Search text is empty, finding all');
      this.find();
      this.homeList = this.cacheFromList;
    } else {
      console.log('Searching for: ' + this.getSearchText()!.value);
      this.alertService.showLoadingAlert(phrases.searching);
      const keyword: string = this.getSearchText()!.value;
      const cache = this.cacheFromList;

      const filteredCourses = cache.filter((item) => {
        return item.curso.some((curso) =>
          curso.nome!.toLowerCase().match(keyword.toLowerCase())
        );
      });

      if (filteredCourses.length === 0) {
        this.alertService.showWarningAlert(
          phrases.noResultsFound,
          phrases.warning
        );
      } else {
        this.homeList = filteredCourses;
        this.alertService.closeAlert();
      }

      this.form.reset();
    }
  }

  protected redirectToVideoList(courseId: string) {
    console.log('Redirecting to video list'+ courseId);
    this.router.navigate(['video/list']);
  }
}
