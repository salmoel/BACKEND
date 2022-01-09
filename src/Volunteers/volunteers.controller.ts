import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
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
    private readonly uploadImagesVolunteersService: UploadImagesVolunteersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Voluntary[]> {
    return this.volunteersService.getAll();
  }

  //  consulta voluntario
  @UseGuards(JwtAuthGuard)
  @Get('/voluntary')
  async getConsulta(@Query() termoBusca: string): Promise<Voluntary[]> {
    console.log(termoBusca);
    this.volunteersService
      .findName(termoBusca)
      .then((resultado) => console.log(resultado));

    return this.volunteersService.findName(termoBusca);
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
        { name: 'imgsCasaDescansoFile', maxCount: 20 },
      ],
      {
        storage: diskStorage({
          filename: editFileName,
        }),
        limits: { fileSize: 17301504 },
        fileFilter: imageFileFilter,
      }
    )
  )
  async create(
    @Body() voluntary: Voluntary,
    @UploadedFiles() files
  ): Promise<Voluntary> {
    let urlsImageLocal;
    // serviço que controla o upload das imagens para o imagekit
    // o trabalho dela é pegar os arquivos que vieram na requisição, fazer o upload e retornar as urls para montagem do novo objeto
    urlsImageLocal = await this.uploadImagesVolunteersService.upload(files);

     console.log("novo objeto criado com as urls das imagens UPLOIDADAS :: ", urlsImageLocal);

    var voluntaryNew: Voluntary = Object.assign(voluntary, {
      urlsImage: urlsImageLocal,
    }); // gardando as novas urls das imagens já uploidadas no objeto de voluntário
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
    return isCreated;
  }
  @UseGuards(JwtAuthGuard)
  @Put('status/:id')
  async updateStatusVoluntary(
    @Param('id') id: string,
    @Query() status: string
  ) {
   return await this.volunteersService.updateStatus(id, status['status']);
   }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imgFilePrincipal', maxCount: 1 },
        { name: 'imgFileCasaDescansoPrincipal', maxCount: 1 },
        { name: 'imgsCasaDescansoFile', maxCount: 20 },
      ],
      {
        storage: diskStorage({
          filename: editFileName,
        }),
        limits: { fileSize: 17301504 },
        fileFilter: imageFileFilter,
      }
    )
  )
  async update(
    @Param('id') id: string,
    @Body() voluntary: Voluntary,
    @UploadedFiles() files
  ) :Promise<any>{
    // console.debug(id);
    // console.debug('================');
    //  console.debug(voluntary);
    // console.debug('================');
    // console.debug(files);

    if (objectIsEmpty(files)) {

      console.log('Sem arquivos para atualizar');
      return await this.volunteersService.update(id, voluntary); // função que atualiza o vluntario no banco
    } else {
  

      let urlsImageLocal;
      console.log('com arquivos para atualizar');

      await this.uploadImagesVolunteersService.deletionSettings(id, files); // Realiza as configurações para deleção e chama a função que deleta no imagekit

      urlsImageLocal = await this.uploadImagesVolunteersService.upload(
        // serviço que controla o upload das imagens para o imagekit  o trabalho dela é pegar os arquivos que vieram na requisição, fazer o upload e retornar as urls para montagem do novo objeto
       files, id
        // this.urlsImage
      );

      // console.log("novo objeto criado com as urls das imagens UPLOIDADAS :: ", urlsImageLocal);

      var voluntaryNew: Voluntary = Object.assign(voluntary, {
        urlsImage: urlsImageLocal,
      }); // gardando as novas urls das imagens já uploidadas no objeto de voluntário
      // console.log("dados que estão sendo atualizdo no banco",voluntaryNew);
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
