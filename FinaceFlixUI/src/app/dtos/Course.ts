import { CategoryCourseResponse } from "./CategoryCourseResponse";

export interface Course {
  id?: string;
  nome?: string;
  descricao?: string;
  imagem?: string;
  categoriaId?: string;
  categoriaNome?: string;
  dono?: string;
  categoria?: CategoryCourseResponse;
}
