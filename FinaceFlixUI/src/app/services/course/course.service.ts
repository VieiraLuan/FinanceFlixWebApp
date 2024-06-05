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

  public retrieveCoursesByOwner(course:Course): Observable<Course[]> {

  //   {
  //     "id": "5a09df25-07f2-44ea-bdff-78f8f74fc344",
  //     "nome": "teste",
  //     "descricao": "teste",
  //     "imagem": "https://fiapsaccount.blob.core.windows.net/financeflix-images/840fdd2b-688a-47b4-a317-0da1feb24a9c.png",
  //     "categoria": {
  //         "id": "0e6fa0ad-4711-4a19-bdc7-7df0d22749e2",
  //         "nome": "teste",
  //         "descricao": "teste",
  //         "createdDate": null
  //     }
  // }

    const retrieveCoursesPath = this.baseUrl + environment.GetCoursesByOwner;

    return this.http
      .post<Course[]>(retrieveCoursesPath, course, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Course[]>) => {
          return response.body || [];
        })
      );
  }
}
