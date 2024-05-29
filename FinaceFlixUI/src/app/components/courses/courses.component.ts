import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor() { }

  title?: string;
  courses = [{id:0, name:'C#', desc:'loremdsaindisanidisndsadsdsadasdsadsadadsadsadsdasddsdsadasddsa',category:'Programação'}];

  ngOnInit(): void {
    this.title = 'Cursos';
    this.retriveCourses();
  }


  protected addCourse() {
    console.log('Course added');
  }

  protected editCourse() {
    console.log('Course edited');
  }

  protected deleteCourse() {
    console.log('Course deleted');
  }

  private retriveCourses(){
    console.log('Retriving courses');
  }

}
