import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { Voluntary } from '../shared/voluntary';

import { VolunteersService } from './volunteers.service';
import { UploadImagesVolunteersService } from './uploadimagesvolunteers.service';
import { diskStorage } from 'multer';
import { objectIsEmpty } from 'src/utils/objectIsEmpty';
import { query } from 'express';

@Controller('volunteers')
export class VolunteersController {
  constructor(
    private readonly volunteersService: VolunteersService,
    private readonly uploadImagesVolunteersService: UploadImagesVolunteersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Voluntary[]> {
    return this.volunteersService.getAll();
  }
  
  //  consulta voluntario
    @UseGuards(JwtAuthGuard)
    @Get('/voluntary')
    async getConsulta(@Query() termoBusca: string): Promise<Voluntary[]> {
      console.log(termoBusca)
      this.volunteersService.findName(termoBusca).then(resultado => console.log(resultado)
      )
      
      return this.volunteersService.findName(termoBusca)
    }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Voluntary> {
    return this.volunteersService.getById(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imgFilePrincipal', maxCount: 1 },
        { name: 'imgFileCasaDescansoPrincipal', maxCount: 1 },
        { name: 'imgsCasaDescansoFile', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          filename: editFileName,
        }),
        limits: { fileSize: 350000 },
        fileFilter: imageFileFilter,
      }
    )
  )
  async create(
    @Body() voluntary: Voluntary,
    @UploadedFiles() files
  ): Promise<Voluntary> {
    let urlsImageLocal
    // servi??o que controla o upload das imagens para o imagekit
    // o trabalho dela ?? pegar os arquivos que vieram na requisi??????o, fazer o upload e retornar as urls para montagem do novo objeto
    urlsImageLocal = this.uploadImagesVolunteersService.upload(
      files.imgFilePrincipal,
      files.imgFileCasaDescansoPrincipal,
      files.imgsCasaDescansoFile,
    )

    // console.log("novo objeto criado com as urls das imagens UPLOIDADAS :: ", urlsImageLocal);


    var voluntaryNew: Voluntary = Object.assign(voluntary, { urlsImage: urlsImageLocal }); // gardando as novas urls das imagens j?? uploidadas no objeto de volunt??rio
    // console.log(voluntaryNew);
    const isCreated = await this.volunteersService.create(voluntaryNew);
    if (isCreated) {
      console.log('objeto sendo zerado');
      for (const prop of Object.getOwnPropertyNames(urlsImageLocal)) {
        delete urlsImageLocal[prop];
      }
      for (const prop of Object.getOwnPropertyNames(files)) {
        delete files[prop];
      }
    }
    return isCreated
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imgFilePrincipal', maxCount: 1 },
        { name: 'imgFileCasaDescansoPrincipal', maxCount: 1 },
        { name: 'imgsCasaDescansoFile', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          filename: editFileName,
        }),
        limits: { fileSize: 350000 },
        fileFilter: imageFileFilter,
      }
    )
  )
  async update(
    @Param('id') id: string,
    @Body() voluntary: Voluntary,
    @UploadedFiles() files
  ) {
    //: Promise<Voluntary>


    // console.log(id);
    // console.log('================');
    //  console.log(voluntary);
    // console.log('================');
    // console.log(files);

    if (objectIsEmpty(files)) {
      console.log('Sem arquivos para atualizar');
      return this.volunteersService.update(id, voluntary);// fun????o que atualiza o vluntario no banco 
    } else {
      let urlsImageLocal
      console.log("com arquivos para atualizar");

      this.uploadImagesVolunteersService.deletionSettings(id); // Realiza as configura????es para dele????o e chama a fun????o que deleta no imagekit

      urlsImageLocal = this.uploadImagesVolunteersService.upload(  // servi??o que controla o upload das imagens para o imagekit  o trabalho dela ?? pegar os arquivos que vieram na requisi??????o, fazer o upload e retornar as urls para montagem do novo objeto
        files.imgFilePrincipal,
        files.imgFileCasaDescansoPrincipal,
        files.imgsCasaDescansoFile,
        // this.urlsImage
      )

      // console.log("novo objeto criado com as urls das imagens UPLOIDADAS :: ", urlsImageLocal);


      var voluntaryNew: Voluntary = Object.assign(voluntary, { urlsImage: urlsImageLocal }); // gardando as novas urls das imagens j?? uploidadas no objeto de volunt??rio
      // console.log("dados que est??o sendo atualizdo no banco",voluntaryNew);
      return await this.volunteersService.update(id, voluntaryNew);
    }
    // return this.volunteersService.update(id, voluntary);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async Delete(@Param('id') id: string) {
    return this.volunteersService.delete(id);
  }

}
