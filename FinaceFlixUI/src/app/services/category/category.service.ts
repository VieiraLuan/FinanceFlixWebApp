import { CategoryResponse } from './../../dtos/CategoryResponse';
import { CategoryRequest } from './../../dtos/CategoryRequest';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // Request details
  private baseUrl = environment.BaseUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.getToken()}`,
  });

  private getToken(): string {
    return window.localStorage.getItem('token') || '';
  }

  public addCategory(
    category: CategoryRequest
  ): Observable<{ nome: string; descricao: string; dono: string }> {
    const addCategoryPath = this.baseUrl + environment.AddCategoryPath;

    return this.http
      .post<{ nome: string; descricao: string; dono: string }>(
        addCategoryPath,
        category,
        {
          headers: this.headers,
          observe: 'response',
        }
      )
      .pipe(
        map(
          (
            response: HttpResponse<{
              nome: string;
              descricao: string;
              dono: string;
            }>
          ) => {
            const nome = response.body?.nome || '';
            const descricao = response.body?.descricao || '';
            const dono = response.body?.dono || '';

            return { nome, descricao, dono };
          }
        )
      );
  }

  public updateCategory(
    category: CategoryRequest
  ): Observable<CategoryResponse> {
    const updateCategoryPath = this.baseUrl + environment.UpdateCategoryPath;

    return this.http
      .put<CategoryResponse>(updateCategoryPath, category, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<CategoryResponse>) => {
          return response.body || { id: '', nome: '', descricao: '', dono: '' };
        })
      );
  }

  public deleteCategory(id: string): Observable<CategoryResponse> {
    const deleteCategoryPath =
      this.baseUrl + environment.DeleteCategoryById + id;

    return this.http
      .delete<CategoryResponse>(deleteCategoryPath, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<CategoryResponse>) => {
          return response.body || { id: '', nome: '', descricao: '', dono: '' };
        })
      );
  }

  public retrieveCategoryById(id: string): Observable<CategoryResponse> {
    const retrieveCategoryPath =
      this.baseUrl + environment.GetCategoryById + id;

    return this.http
      .get<CategoryResponse>(retrieveCategoryPath, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<CategoryResponse>) => {
          return response.body || { id: '', nome: '', descricao: '', dono: '' };
        })
      );
  }

  public retrieveCategories(
    category: CategoryRequest
  ): Observable<CategoryResponse[]> {
    const retrieveCategoriesPath =
      this.baseUrl + environment.GetCategoriesByOwner;

    return this.http
      .post<CategoryResponse[]>(retrieveCategoriesPath, category, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<CategoryResponse[]>) => {
          return response.body || [];
        })
      );
  }
}
