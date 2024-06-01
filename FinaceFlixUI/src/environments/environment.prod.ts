export const environment = {
  production: true,
//Current API URLs
  BaseUrl: `https://financeflix-dsv.azurewebsites.net/`,
  // BaseUrl: `https://localhost:7168/`,

  //Account service endpoints
  LoginPath: `api/v1/Usuario/login`, /*Alterar para o login*/
  CreateAccountPath: `api/v1/Usuario/AddUser`,

  //Category service endpoints
  AddCategoryPath: `api/v1/Categoria`,
  GetCategoriesByOwner: `api/v1/Categoria/GetByEmail`,
  DeleteCategoryById: `api/v1/Categoria/`,
  
};
