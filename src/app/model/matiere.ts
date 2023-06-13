import { User } from './user'

export class Matiere {
  _id!: string;
  nom!: string;
  professeur!: User;
  imagePath!: string;
  [key: string]: any;
}
