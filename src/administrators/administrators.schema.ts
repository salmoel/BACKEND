import * as mongoose from 'mongoose';

export const AdministratorsSchema = new mongoose.Schema({
  typeUser: String,
  nome: String,
  email: String,
  password: String,
  dataCad: String,
  status: String,
  sexo: String,
  dataNascimento: String,
  urlsImage: {
    urlImgAdmin: String,
  },
});
