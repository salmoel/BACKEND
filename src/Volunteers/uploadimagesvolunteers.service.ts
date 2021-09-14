import { Injectable } from '@nestjs/common';
import {
  getFileImagAndDelet,
  getUrl,
  uploadImag,
} from 'src/utils/uploadImgKit';
import { VolunteersService } from './volunteers.service';

@Injectable()
export class UploadImagesVolunteersService {
  urlsImage: any = {
    urlImgPrincipal: '',
    urlImgCasaDescansoPrincipal: '',
    urlImgsCasaDescanso: [],
  };
  constructor(private readonly volunteersService: VolunteersService) {}
 
  public upload(
    imgFilePrincipal: any[],
    imgFileCasaDescansoPrincipal: any[],
    imgsCasaDescansoFile: any[], 
  ) {
    let UrlsImageVar
    UrlsImageVar = []
    UrlsImageVar = this.urlsImage
    // const pathFolder = '/teste'
    const pathFolder = process.env.PATH_FOLDER_VOLUNTEERS

    if (imgFilePrincipal) {
      console.log("entrou no imgFilePrincipal");
      
      let item = imgFilePrincipal[0];
      UrlsImageVar.urlImgPrincipal = getUrl(item.filename, pathFolder);
      uploadImag(item.path, item.filename, pathFolder);

      // urlsImage.imgFilePrincipal = getUrlUploadImageIF(item); // função gera a url e faz upload da imagem, armazenando a url no objeto
    }
    if (imgFileCasaDescansoPrincipal) {

      let item = imgFileCasaDescansoPrincipal[0];
      UrlsImageVar.urlImgCasaDescansoPrincipal = getUrl(item.filename, pathFolder);
      uploadImag(item.path, item.filename, pathFolder);

      // urlsImage.imgFileCasaDescansoPrincipal = getUrlUploadImageIF(item); // função gera a url e faz upload da imagem
    }
    if (imgsCasaDescansoFile) {
      console.log("entrou no imgsCasaDescansoFile");

      // se o campo com as imagens da casadescanso estiver com valor entra
      imgsCasaDescansoFile.forEach(function (item: any, index: any) {
        UrlsImageVar.urlImgsCasaDescanso[index] = getUrl(
          item.filename,
          pathFolder
          );
          uploadImag(item.path, item.filename, pathFolder);
          // urlsImage.imgsCasaDescansoFile[index] = getUrlUploadImageIF(item); // função gera a url e faz upload da imagem
        });

    }

    return UrlsImageVar
  }

  public async deletionSettings(id: string) {
   
    
    let volunteerUpdateImage;
    let listUrlsOfTheImagesToBeDeleted = [];
    let listNameImg = [];
    
    await this.volunteersService.getById(id).then((voluntary) => {
      volunteerUpdateImage = voluntary.urlsImage;

    });

    if (volunteerUpdateImage.urlImgsCasaDescanso[0]) {
      // se tiverem imagens da casa do voluntário
      
      for (
        let i = 0;
        i < volunteerUpdateImage.urlImgsCasaDescanso.length;
        i++
      ) {
        listUrlsOfTheImagesToBeDeleted.push(
          volunteerUpdateImage.urlImgsCasaDescanso[i]
        ); // coloque a url dessas imagens no array de imagens que serão deletadas
      }
    }
    if (volunteerUpdateImage.urlImgPrincipal[0]) {
      // se tive imagem principal do volutario
      listUrlsOfTheImagesToBeDeleted.push(volunteerUpdateImage.urlImgPrincipal); // coloque a url desta imagem no array de imagens que serão deletadas
    }

    if (volunteerUpdateImage.urlImgCasaDescansoPrincipal[0]) {
      // se tiver imagem principal da casa de descanso

      listUrlsOfTheImagesToBeDeleted.push(
        volunteerUpdateImage.urlImgCasaDescansoPrincipal
      ); // coloque a url dessa imagem no array das imagens que serão deletadas
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
