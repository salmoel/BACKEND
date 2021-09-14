import { Injectable } from '@nestjs/common';
import {
  getFileImagAndDelet,
  getUrl,
  uploadImag,
} from 'src/utils/uploadImgKit';
import { AdministratorsService } from './administrators.service';

@Injectable()
export class UploadimagesadministratorsService {

  urlsImage: any = {
    urlImgAdmin: '',
  };

  constructor(private readonly administratorsService: AdministratorsService){}
  
  public upload(imgAdmin: any): any{
    let UrlsImageVar
    UrlsImageVar = []
    UrlsImageVar = this.urlsImage
    const pathFolder = process.env.PATH_FOLDER_ADMINISTRATORS

    if (imgAdmin) {
      console.log("entrou no imgAdmin");
      
      let item = imgAdmin[0];
      UrlsImageVar.urlImgAdmin = getUrl(item.filename, pathFolder);
      uploadImag(item.path, item.filename, pathFolder);
     }

     return UrlsImageVar
  }

  public async deletionSettings(id: string) {
    let administratorsUpdateImage;
    let listUrlsOfTheImagesToBeDeleted = [];
    let listNameImg = [];
    
    await this.administratorsService.getById(id).then((administrator) => {
      administratorsUpdateImage = administrator.urlsImage;
    });

    if (administratorsUpdateImage.urlImgAdmin[0]) {
      // se tive imagem principal do administrador
      listUrlsOfTheImagesToBeDeleted.push(administratorsUpdateImage.urlImgAdmin); // coloque a url desta imagem no array de imagens que serão deletadas
    }
    console.log(listUrlsOfTheImagesToBeDeleted," :::::: Array de URLS de imagens se serem deletadas")

    for (let i = 0; i < listUrlsOfTheImagesToBeDeleted.length; i++) {
      // para cada url contida no array de url de imagens que serão deletadas

      const element = listUrlsOfTheImagesToBeDeleted[i];
      listNameImg.push(element.split('/')[5]); // recorte somente o nome da url e guarde no array de nome de imanges que serão deletadas
    }
      
    console.log(listNameImg, ':::::: Array de nomes de imagens a serem deletadas');
    for (let i = 0; i < listNameImg.length; i++) {
      // para cada nome dentro do array de nome de imagens que serão deletadas
      const element = listNameImg[i];
      getFileImagAndDelet(element) // chama a função que contem a requisção http de deleção de imagens no imagekit
    }
  }

 }
