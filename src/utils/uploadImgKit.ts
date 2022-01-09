import { imagekit } from './../main';
import { readFile } from 'fs';

// gera a url do arquivo para ser armazenado no banco
export function getUrl(fileName, pathFolder: string) {
  var imageURL = imagekit.url({
    path: `${pathFolder}/${fileName}`,
  });
  // console.log('URL LOCAL:::::', imageURL);
  return imageURL;
}
// faz upload do arquivo para a raiz

export async function uploadImag(path: any, fileName, pathFolder: string) {
  readFile(path, function (err, data) {
    if (err) throw err; 
    imagekit.upload(
      {
        file: data, //required
        fileName: fileName, //required
        useUniqueFileName: false,
        folder: pathFolder,
        isPrivateFile:false
      },
      function (error, result) {
        if (error) console.log(`IMAGEM ${fileName} UPLOAD ::ERROR::`);
        else console.log(`IMAGEM ${fileName} UPLOAD ::OK::`)
      }
    );
  });
}

// consulta a imagem no imagekit pelo nome da imagem
// retorna o Id da imagem entre outros
export async function getFileImagAndDelet(nameImg: string) {

  let idImage;
  // let getThePathName = path.split('/')

  imagekit.listFiles(
    {
      name: nameImg,
    },
    function (error, result) {
      if (error) console.log('::: ERRO NA BUSCA DAS IMAGENS :::', error);
      else {
        
        if (result[0] == undefined) {
          console.log(`A IMAGEM SOB NOME ::: ${nameImg} ::: NÃO FOI ENCONTRADA`);
        } else {
          console.log(`A IMAGEM SOB NOME ::: ${nameImg} ::: ENCONTRADA`);
         
          for (let i in result) {
            idImage = result[i].fileId;
            deleteImag(idImage); // chama a função que teldeta os arquivos no imagekit
          }
        }
      

      }
    }
  );
}

// deleta a imagem  precia receber o id da imagem para deletar

export async function deleteImag(fileId) {
  // console.log('id no deletador', fileId);

  imagekit.deleteFile(fileId, function (error, result) {
    if (error) console.log('::: ERRO NA DELEÇÃO DAS IMAGENS :::', error);
    else {
    console.log(`A IMAGEM SOB ID ::: ${fileId} ::: FOI DELETADA COM SUCESSO`);
    }
  });
}
