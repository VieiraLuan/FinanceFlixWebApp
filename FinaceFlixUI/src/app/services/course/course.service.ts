import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from 'src/app/dtos/Course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.BaseUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.getToken()}`,
  });

  private getToken(): string {
    return window.localStorage.getItem('token') || '';
  }

  public addCourse(
    course: Course
  ): Observable<{ nome: string; descricao: string; categoriaId: string }> {
    const addCoursePath = this.baseUrl + environment.AddCoursePath;

    return this.http
      .post<{
        nome: string;
        descricao: string;
        categoriaId: string;
      }>(addCoursePath, course, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map(
          (
            response: HttpResponse<{
              nome: string;
              descricao: string;
              categoriaId: string;
            }>
          ) => {
            const nome = response.body?.nome || '';
            const descricao = response.body?.descricao || '';
            const categoriaId = response.body?.categoriaId || '';

            return { nome, descricao, categoriaId };
          }
        )
      );
  }

  public retrieveCoursesByOwner(course: Course): Observable<Course[]> {
    const retrieveCoursesPath = this.baseUrl + environment.GetCoursesByOwner;

    return this.http
      .post<Course[]>(retrieveCoursesPath, course, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Course[]>) => {
          response.body?.forEach((element) => {
            console.log((element.id = element.id || ''));

            console.log(element.nome || '');
            console.log(element.descricao || '');
            console.log(element.categoriaId || '');
            console.log(element.dono || '');
          });
          return response.body || [];
        })
      );
  }

  public retrieveCourseById(course: Course): Observable<Course> {
    const retrieveCoursePath =
      this.baseUrl + environment.GetCourseById + course.id;

    return this.http
      .get<Course>(retrieveCoursePath, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Course>) => {
          return response.body || course;
        })
      );
  }

  public updateCourse(course: Course): Observable<Course> {
    const updateCoursePath = this.baseUrl + environment.UpdateCoursePath;

    return this.http
      .put<Course>(updateCoursePath, course, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Course>) => {
          return response.body || course;
        })
      );
  }

  public deleteCourse(id: string): Observable<Course> {
    const deleteCoursePath = this.baseUrl + environment.DeleteCourseById + id;

    return this.http
      .delete<Course>(deleteCoursePath, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Course>) => {
          return response.body || { id: '' };
        })
      );
  }
}
