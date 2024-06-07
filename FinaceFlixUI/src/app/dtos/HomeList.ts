import { Course } from "./Course";

export interface HomeList {
  id:string;
  nome: string;
  descricao: string;
  dono: string;
  curso: Course[];
}

