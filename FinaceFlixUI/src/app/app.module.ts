import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { FooterLoginComponent } from './components/footer-login/footer-login.component';
import { GenericBackButtonComponent } from './shared/components/generic-back-button/generic-back-button.component';
import { GenericHeaderComponent } from './shared/components/generic-header/generic-header.component';
import { LoggingInterceptor } from './shared/interceptor';
import { HeaderCreateAccountComponent } from './components/header-create-account/header-create-account.component';
import { HeaderAuthenticatedComponent } from './components/header-authenticated/header-authenticated.component';

import { CoursesComponent } from './components/course-feature/courses/courses.component';
import { VideosComponent } from './components/video-feature/videos/videos.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { AddCategoryComponent } from './components/category-feature/add-category/add-category.component';
import { EditCategoryComponent } from './components/category-feature/edit-category/edit-category.component';
import { CategoryComponent } from './components/category-feature/category/category.component';
import { AddCourseComponent } from './components/course-feature/add-course/add-course.component';
import { EditCourseComponent } from './components/course-feature/edit-course/edit-course.component';
import { AddVideoComponent } from './components/video-feature/add-video/add-video.component';
import { EditVideoComponent } from './components/video-feature/edit-video/edit-video.component';
import { VideoListComponent } from './components/video-feature/video-list/video-list.component';
import { HeaderVideoListComponent } from './components/header-video-list/header-video-list.component';
import { PlayerComponent } from './components/video-feature/video-player/player/player.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    HeaderLoginComponent,
    FooterLoginComponent,
    GenericBackButtonComponent,
    GenericHeaderComponent,
    HeaderCreateAccountComponent,
    HeaderAuthenticatedComponent,
    CategoryComponent,
    CoursesComponent,
    VideosComponent,
    CertificatesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddCourseComponent,
    EditCourseComponent,
    AddVideoComponent,
    EditVideoComponent,
    VideoListComponent,
    HeaderVideoListComponent,
    PlayerComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:LoggingInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
