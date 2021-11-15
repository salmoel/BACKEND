import * as mongoose from 'mongoose';
mongoose.Schema.Types.Boolean.convertToFalse.add('')
export const AdministratorsSchema = new mongoose.Schema({
  retailerID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    index: true,
  },
_id:{type: mongoose.Schema.Types.ObjectId},
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
