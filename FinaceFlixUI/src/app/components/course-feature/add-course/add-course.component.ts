import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/dtos/Category';
import { CategoryRequest } from 'src/app/dtos/CategoryRequest';
import { Course } from 'src/app/dtos/Course';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { CourseService } from 'src/app/services/course.service';
import { phrases } from 'src/app/shared/phrases/phrases';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  constructor(
    private utils: UtilsService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      picture: [null],
      name: [null, Validators.required],
      description: [null, Validators.required],
      categoryId: [null, Validators.required],
    });

    this.title = 'Adicionar Curso';

    this.retriveCategories();
  }

  title?: string;

  form!: FormGroup;

  private pictureBase64!: string;

  protected categories: Category[] = [];

  private getName(): string {
    return this.form.get('name')?.value;
  }

  private getDescription(): string {
    return this.form.get('description')?.value;
  }

  private getCategoryId(): string {
    return this.form.get('categoryId')?.value;
  }

  private getOwner(): string {
    return window.localStorage.getItem('userEmail') || '';
  }

  private retriveCategories() {
    const category: CategoryRequest = {
      nome: '',
      descricao: '',
      dono: this.getOwner(),
    };

    this.categoryService.retrieveCategories(category).subscribe({
      next: (response) => {
        response.forEach((element) => {
          var category: Category = {
            id: element.id,
            name: element.nome,
            desc: element.descricao,
            owner: this.getOwner(),
          };

          this.categories.push(category);
        });
      },

      error: (error: any) => {
        console.error('Error retrieving categories', error);
      },
    });
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.utils
        .convertToBase64(file)
        .then((base64) => {
          this.pictureBase64 = base64.replace(
            /^data:image\/[a-zA-Z]+;base64,/,
            ''
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  private validateFields(): boolean {
    if (
      this.getName() === null ||
      this.getName() === undefined ||
      this.getName() === ''
    ) {
      this.alertService.showWarningAlert(
        phrases.writeValidName,
        phrases.invalidName
      );
      return false;
    }
    if (
      this.getDescription() === null ||
      this.getDescription() === undefined ||
      this.getDescription() === ''
    ) {
      this.alertService.showWarningAlert(
        phrases.writeValidDesc,
        phrases.invalidDesc
      );
      return false;
    }
    if (
      this.getCategoryId() === null ||
      this.getCategoryId() === undefined ||
      this.getCategoryId() === '' ||
      this.getCategoryId() === '0'
    ) {
      this.alertService.showWarningAlert(
        phrases.chooseValidCategory,
        phrases.invalidCategory
      );
      return false;
    }

    if (
      this.pictureBase64 === null ||
      this.pictureBase64 === undefined ||
      this.pictureBase64 === ''
    ) {
      this.alertService.showWarningAlert(
        phrases.selectAnImage,
        phrases.emptyImage
      );
      return false;
    }
    return true;
  }

  //Terminar implementar este método
  protected addCourse() {
    this.alertService.showLoadingAlert('Cadastrando...');

    if (!this.validateFields()) {
      return;
    }

    const course: Course = {
      nome: this.getName(),
      descricao: this.getDescription(),
      categoriaId: this.getCategoryId(),
      imagem: this.pictureBase64,
    };

    // this.courseService.addCourse(course).subscribe({
    //   next: (response) => {
    //     this.alertService.showSuccessAlert(
    //       phrases.categoryAddedSuccess,
    //       phrases.categoryAdded
    //     );
    //     this.router.navigate(['/courses']);
    //   },
    //   error: (error: any) => {
    //     console.error('Error adding course', error);
    //     this.alertService.showErrorAlert(phrases.errorPhrase, error);
    //   },
    // });
  }
}
