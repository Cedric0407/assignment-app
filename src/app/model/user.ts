export class User {
  _id!: string;
  email!: string;
  nom!: string;
  imagePath?: string;
  role!: string;
  [key: string]: any;
}
