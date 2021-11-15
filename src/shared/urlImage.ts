import { Document } from 'mongoose';

export class UrlImage extends Document {
  urlImgPrincipal: string;
  urlImgCasaDescansoPrincipal: string;
  urlImgsCasaDescanso: Array<string>
}
