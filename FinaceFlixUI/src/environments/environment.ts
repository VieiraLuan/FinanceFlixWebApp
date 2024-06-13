// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //Current API URLs
  // BaseUrl: `https://financeflix-dsv.azurewebsites.net/`,
  BaseUrl: `https://localhost:7168/`,


  //Account service endpoints
  LoginPath: `api/v1/Usuario/login`, /*Alterar para o login*/
  CreateAccountPath: `api/v1/Usuario/AddUser`,


  //Category service endpoints
  AddCategoryPath: `api/v1/Categoria`,
  GetCategoriesByOwner: `api/v1/Categoria/GetByEmail`,
  DeleteCategoryById: `api/v1/Categoria/`,
  GetCategoryById: `api/v1/Categoria/`,
  UpdateCategoryPath: `api/v1/Categoria/`,


  // Course service endpoints
  GetAllCoursesPath: `api/v1/Categoria/GetAllCategoriesWithCourse`,
  AddCoursePath: `api/v1/Curso/AddCursoCategoriaExists`,
  GetCoursesByOwner: `api/v1/Curso/GetByEmail`,
  GetCourseById: `api/v1/Curso/`,
  UpdateCoursePath: `api/v1/Curso/`,
  DeleteCourseById: `api/v1/Curso/`,

  // Video service endpoints
  AddVideoPath: `api/v1/Video/Add`,
  AddVideoToCoursePath: `api/v1/Video/AddVideoToCurso`,
  RetrieveVideosPath: `api/v1/Video/GetAll`,
  GetVideoByIdPath: `api/v1/Video`,
  UpdateVideoPath: `api/v1/Video`,


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
