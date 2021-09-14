import { Document } from 'mongoose';

export class Administrator extends Document {
  _id: string;
  typeUser: string;
  nome: string;
  email: string;
  password: string;
  password2: string;
  dataCad: string;
  status: string;
  sexo: string;
  dataNascimento: string;
  urlsImage: {
    urlImgAdmin: String,
  }
}
