import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/dtos/Category';
import { CategoryRequest } from 'src/app/dtos/CategoryRequest';
import { Course } from 'src/app/dtos/Course';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { CourseService } from 'src/app/services/course/course.service';
import { phrases } from 'src/app/shared/phrases/phrases';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  constructor(
    private utils: UtilsService,
    private categoryService: CategoryService,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.courseIdFromRoute = params['id'];
    });

    this.form = this.formBuilder.group({
      picture: [null],
      name: [null, Validators.required],
      description: [null, Validators.required],
      categoryId: [null, Validators.required],
    });

    this.title = 'Editar Curso';

    this.retriveCourse();
    this.retriveCategories();
  }

  courseIdFromRoute: string = '';

  title?: string;

  form!: FormGroup;

  course!: Course;

  private pictureBase64!: string;

  protected categories: Category[] = [];

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


    return true;
  }

  protected editCourse() {
    if (!this.validateFields() || !this.courseIdFromRoute || !this.form.valid) {
      return;
    }
    const course: Course = {
      id: this.courseIdFromRoute,
      nome: this.getName(),
      descricao: this.getDescription(),
      categoriaId:
        this.form.get('categoryId')?.value || this.course.categoria?.id,
      dono: window.localStorage.getItem('userEmail') || this.course.dono,
      imagem: this.pictureBase64 || this.course.imagem,
    };


    this.courseService.updateCourse(course).subscribe({
      next: (response) => {
        this.alertService.showSuccessAlert(
          phrases.courseUpdated,
          phrases.sucess
        );

        setTimeout(() => {
          this.router.navigate(['/courses']);
          this.alertService.closeAlert();
        }, 1000);
      },
      error: (error) => {
        this.alertService.showErrorAlert(phrases.errorPhrase, phrases.error);
        console.log('Error editing course', error);
      },
    });
  }

  private getName(): string {
    return this.form.get('name')?.value;
  }

  private getDescription(): string {
    return this.form.get('description')?.value;
  }

  private getCategoryId(): string {
    return this.form.get('categoryId')?.value;
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

  private getOwner(): string {
    return window.localStorage.getItem('userEmail') || '';
  }

  private retriveCourse() {
    const course: Course = {
      id: this.courseIdFromRoute,
    };

    this.courseService.retrieveCourseById(course).subscribe({
      next: (response) => {
        this.course = response;
        this.form.get('name')?.setValue(this.course.nome);
        this.form.get('description')?.setValue(this.course.descricao);
      },
      error: (error) => {
        console.error(error);
      },
    });
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
}
