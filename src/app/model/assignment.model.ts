import { User } from "./user";
import { Matiere } from "./matiere";

export class Assignment {
  _id!: string;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  note!: number;
  remarques!: string;
  matiere!: Matiere;
  auteur!: User;
  [key: string]: any;
}

