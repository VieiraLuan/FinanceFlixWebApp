import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CourseVideo } from 'src/app/dtos/CourseVideo';
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


  public retrieveVideos(): Observable<Video[]> {
    const retrieveVideosPath = this.baseUrl + environment.RetrieveVideosPath;

    return this.http
      .get<Video[]>(retrieveVideosPath, { headers: this.headers })
      .pipe(
        map((videos: Video[]) => {
                return videos;
        })
      );
  }


  public addVideo(video: VideoRequest): Observable<{
    id: string;
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


  public addVideoToCourse(
    VideoId:string,CursoIds:string[]
  ): Observable<{ videoId: string; courseId: string }> {
    const addVideoToCoursePath =
      this.baseUrl + environment.AddVideoToCoursePath;

    return this.http
      .post(
        addVideoToCoursePath,
        { VideoId, CursoIds},
        { headers: this.headers, observe: 'response' }
      )
      .pipe(
        map(
          (response: any) => {
            const videoId = response.body?.videoId || '';
            const courseId = response.body?.courseId || '';
            return { videoId, courseId };
          }
        )
      );
  }

  public getVideoById(id: string): Observable<Video> {
    const getVideoByIdPath = this.baseUrl + environment.GetVideoByIdPath;

    return this.http
      .get<Video>(`${getVideoByIdPath}/${id}`, { headers: this.headers })
      .pipe(
        map((video: Video) => {
          return video;
        })
      );
  }

  public updateVideo(video: Video): Observable<Video> {

    const updateVideoPath = this.baseUrl + environment.UpdateVideoPath;

    return this.http
      .put<Video>(updateVideoPath, video, { headers: this.headers })
      .pipe(
        map((video: Video) => {
          return video;
        })
      );
  }

}
