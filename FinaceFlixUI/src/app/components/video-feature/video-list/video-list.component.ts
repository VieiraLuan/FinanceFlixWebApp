import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/dtos/Course';
import { HomeList } from 'src/app/dtos/HomeList';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mockList: Course[] = [{
    id: "1",
    nome: "Curso 1",
    descricao: "Descrição do curso 1",
  }];


  // id:string;
  // nome: string;
  // descricao: string;
  // dono: string;
  // curso: Course[];



}
