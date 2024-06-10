import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Video } from 'src/app/dtos/Video';
import { VideoRequest } from 'src/app/dtos/VideoRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.BaseUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.getToken()}`,
  });

  private getToken(): string {
    return window.localStorage.getItem('token') || '';
  }

  public addVideo(video: VideoRequest): Observable<{
    nome: string;
    descricao: string;
    duracaoSegundos: string;
    videoFile: string;
  }> {
    const addVideoPath = this.baseUrl + environment.AddVideoPath;

    return this.http
      .post<{
        id: string;
        nome: string;
        descricao: string;
        duracaoSegundos: string;
        videoFile: string;
        videoUrl: string;
      }>(addVideoPath, video, { headers: this.headers, observe: 'response' })
      .pipe(
        map(
          (
            response: HttpResponse<{
              id: string;
              nome: string;
              descricao: string;
              duracaoSegundos: string;
              videoFile: string;
              videoUrl: string;
            }>
          ) => {
            const id = response.body?.id || '';
            const nome = response.body?.nome || '';
            const descricao = response.body?.descricao || '';
            const duracaoSegundos = response.body?.duracaoSegundos || '';
            const videoFile = response.body?.videoFile || '';
            const videoUrl = response.body?.videoUrl || '';

            return {
              id,
              nome,
              descricao,
              duracaoSegundos,
              videoFile,
              videoUrl,
            };
          }
        )
      );
  }
}
