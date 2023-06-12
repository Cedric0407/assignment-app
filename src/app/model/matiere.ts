import { User } from './user'

export class Matiere {
  _id!: number;
  nom!: string;
  professeur!: User;
  imagePath!: string;
}
