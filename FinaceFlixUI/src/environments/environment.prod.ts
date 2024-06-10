export const environment = {
  production: true,
  //Current API URLs
  BaseUrl: `https://financeflix-dsv.azurewebsites.net/`,
  // BaseUrl: `https://localhost:7168/`,

  //Account service endpoints
  LoginPath: `api/v1/Usuario/login` /*Alterar para o login*/,
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
};
