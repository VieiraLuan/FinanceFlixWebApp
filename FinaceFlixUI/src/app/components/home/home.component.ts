import { AlertService } from './../../services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private alertService: AlertService
  ) {}

  form!: FormGroup;
  cursos = [
    { id: 1, nome: 'Angular' },
    { id: 2, nome: 'Java' },
    { id: 3, nome: 'React' },
    { id: 4, nome: 'Vue' },
    { id: 5, nome: 'Python' },
    { id: 6, nome: 'C#' },
    { id: 7, nome: 'Node' },
    { id: 8, nome: 'Ionic' },
    { id: 9, nome: 'Flutter' },
    { id: 10, nome: 'Dart' },
  ];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: [null],
    });
  }

  private getSearchText() {
    return this.form.get('search');
  }

  protected find() {
    this.alertService.showLoadingAlert(phrases.searching);

    if (
      this.getSearchText()!.value === null ||
      this.getSearchText()!.value === undefined ||
      this.getSearchText()!.value === ''
    ) {
      console.log('Search text is empty, find all');
    } else {
      console.log('Searching for: ' + this.getSearchText()!.value);
    }

    this.form.reset();
    this.router.navigate(['home']);
  }
}
