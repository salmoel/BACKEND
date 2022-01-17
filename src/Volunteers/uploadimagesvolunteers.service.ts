import { Injectable } from '@nestjs/common';
import { UrlImage } from 'src/shared/urlImage';
import { Voluntary } from 'src/shared/voluntary';
import { objectIsEmpty } from 'src/utils/objectIsEmpty';
import {
  getFileImagAndDelet,
  getUrl,
  uploadImag,
} from 'src/utils/uploadImgKit';
import { VolunteersService } from './volunteers.service';

@Injectable()
export class UploadImagesVolunteersService {
  urlImage = new Object();
  urlsImage: any = {
    urlImgPrincipal: '',
    urlImgCasaDescansoPrincipal: '',
    urlImgsCasaDescanso: [],
  };

  constructor(private readonly volunteersService: VolunteersService) {}

  public async upload(files, requisitionType: string, id?: string) {
    let imgFilePrincipal: File = files.imgFilePrincipal;
    let imgFileCasaDescansoPrincipal: File = files.imgFileCasaDescansoPrincipal;
    let imgsCasaDescansoFile: File[] = files.imgsCasaDescansoFile;

    // console.debug(imgFilePrincipal);
    // console.debug(imgFileCasaDescansoPrincipal);
    // console.debug(imgsCasaDescansoFile);

    // const pathFolder = '/teste'

    const pathFolder = process.env.PATH_FOLDER_VOLUNTEERS;

    //
    // console.log("JSON.stringify(imgFilePrincipal)", JSON.stringify(imgFilePrincipal))
    // console.log("JSON.stringify(imgFileCasaDescansoPrincipal)", JSON.stringify(imgFileCasaDescansoPrincipal))
    // console.log("oJSON.stringify(imgsCasaDescansoFile)", JSON.stringify(imgsCasaDescansoFile))

    if (imgFilePrincipal) {
      let item = imgFilePrincipal[0];
      this.urlsImage.urlImgPrincipal = getUrl(item.filename, pathFolder);
      uploadImag(item.path, item.filename, pathFolder);
      console.log(":::::::::::: id ", id)


    } else {
      let voluntario:Voluntary = await this.volunteersService.getById(id); 
      this.urlsImage.urlImgPrincipal = voluntario.urlsImage.urlImgPrincipal;
      console.log(":::::::::::: RECEBIDO DO BANCO DE DADOS 2 ", this.urlsImage.urlImgPrincipal)
    }
    if (imgFileCasaDescansoPrincipal) {
      console.log('Subindo a imgFileCasaDescansoPrincipal');

      let item = imgFileCasaDescansoPrincipal[0];
      this.urlsImage.urlImgCasaDescansoPrincipal = getUrl(
        item.filename,
        pathFolder
      );
      uploadImag(item.path, item.filename, pathFolder);
    } else {
      let voluntario: Voluntary;
      if (requisitionType == 'Put') {
        console.log('é PUT ');
        voluntario = await this.volunteersService.getById(id);
        this.urlsImage.urlImgCasaDescansoPrincipal = voluntario.urlsImage.urlImgCasaDescansoPrincipal;
      } else {
        this.urlsImage.urlImgCasaDescansoPrincipal = '';
      }
    }

    if (imgsCasaDescansoFile) {
      // se o campo com as imagens da casadescanso estiver com valor entra
      console.debug('subindo as imgsCasaDescansoFile');
      let varUlImgsCasaDescanso = [];
      imgsCasaDescansoFile.forEach(function (item: any, index: any) {
        // this.urlsImage.urlImgsCasaDescanso[index] = getUrl(item.filename,pathFolder);
        varUlImgsCasaDescanso.push(getUrl(item.filename, pathFolder));
        uploadImag(item.path, item.filename, pathFolder);
      });
      this.urlsImage.urlImgsCasaDescanso = varUlImgsCasaDescanso;
    } else {
      let voluntario:Voluntary;
      if (requisitionType == 'Put') {
        console.log('é PUT ');
        voluntario = await this.volunteersService.getById(id);
        this.urlsImage.urlImgsCasaDescanso = voluntario.urlsImage.urlImgsCasaDescanso;
      } else {
        this.urlsImage.urlImgsCasaDescanso = [];
      }
    }

    return this.urlsImage;
  }

  // para essa função que deleta as URLS, preciso enviar imagens para que ela possa decidir se deve deletar a url existente ou não

  public async deletionSettings(id: string, novosArquivos) {
    let volunteerUpdateImage;
    let listUrlsOfTheImagesToBeDeleted = [];
    let listNameImg = [];

    await this.volunteersService.getById(id).then((voluntaryDB) => {
      volunteerUpdateImage = voluntaryDB.urlsImage;
    });

    /* files.imgFilePrincipal,
        files.imgFileCasaDescansoPrincipal,
        files.imgsCasaDescansoFile */

    console.log(
      'novosArquivos.imgsCasaDescansoFile',
      JSON.stringify(novosArquivos.imgsCasaDescansoFile)
    );
    console.log(
      'novosArquivos.imgFilePrincipal)',
      JSON.stringify(novosArquivos.imgFilePrincipal)
    );
    console.log(
      'novosArquivos.imgFileCasaDescansoPrincipal)',
      JSON.stringify(novosArquivos.imgFileCasaDescansoPrincipal)
    );

    if (novosArquivos.imgsCasaDescansoFile) {
      console.log(
        'EU ADICIONEI A URL DA imgsCasaDescansoFile PARA DELETAR +++++'
      );
      if (volunteerUpdateImage.urlImgsCasaDescanso) {
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
    } else {
      console.log(
        'EU NÃO ADICIONEI A URL DA imgsCasaDescansoFile PARA DELETAR ------'
      );
    }

    if (novosArquivos.imgFilePrincipal) {
      console.log('EU ADICIONEI A URL DA IMAGEM PRINCIPAL PARA DELETAR +++++');
      if (volunteerUpdateImage.urlImgPrincipal[0]) {
        // se tive imagem principal do volutario
        listUrlsOfTheImagesToBeDeleted.push(
          volunteerUpdateImage.urlImgPrincipal
        ); // coloque a url desta imagem no array de imagens que serão deletadas
      }
    } else {
      console.log(
        'EU NÃO ADICIONEI A URL DA IMAGEM PRINCIPAL PARA DELETAR ------'
      );
    }

    if (novosArquivos.imgFileCasaDescansoPrincipal) {
      console.log(
        'EU ADICIONEI A URL DA imgFileCasaDescansoPrincipal PARA DELETAR +++++'
      );
      if (volunteerUpdateImage.urlImgCasaDescansoPrincipal[0]) {
        // se tiver imagem principal da casa de descanso

        listUrlsOfTheImagesToBeDeleted.push(
          volunteerUpdateImage.urlImgCasaDescansoPrincipal
        ); // coloque a url dessa imagem no array das imagens que serão deletadas
      }
    } else {
      console.log(
        'EU NÃO ADICIONEI A URL DA imgFileCasaDescansoPrincipal PARA DELETAR ------'
      );
    }

    console.log(
      listUrlsOfTheImagesToBeDeleted,
      ' :::::: Array de URLS de imagens se serem deletadas'
    );

    for (let i = 0; i < listUrlsOfTheImagesToBeDeleted.length; i++) {
      // para cada url contida no array de url de imagens que serão deletadas

      const element = listUrlsOfTheImagesToBeDeleted[i];
      listNameImg.push(element.split('/')[5]); // recorte somente o nome da url e guarde no array de nome de imanges que serão deletadas
    }
    console.log(
      listNameImg,
      ':::::: Array de nomes de imagens a serem deletadas'
    );

    for (let i = 0; i < listNameImg.length; i++) {
      // para cada nome dentro do array de nome de imagens que serão deletadas
      const element = listNameImg[i];
      getFileImagAndDelet(element); // chama a função que contem a requisção http de deleção de imagens no imagekit
    }
  }
}
