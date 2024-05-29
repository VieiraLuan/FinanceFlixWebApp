import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  constructor() { }

  title?: string;
  videos = [{id:0, name:'C#', desc:'loremdsaindisanidisndsadsdsadasdsadsadadsadsadsdasddsdsadasddsa',course:'C#',duration:1}];

  ngOnInit(): void {
    this.title = 'Videos';
    this.retriveVideo();
  }


  protected addVideo() {
    console.log('Course added');
  }

  protected editVideo() {
    console.log('Course edited');
  }

  protected deleteVideo() {
    console.log('Course deleted');
  }

  private retriveVideo(){
    console.log('Retriving courses');
  }

}
