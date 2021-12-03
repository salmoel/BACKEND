import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { Administrator } from 'src/shared/administrator';
import { diskStorage } from 'multer';
import { objectIsEmpty } from 'src/utils/objectIsEmpty';
import { AuthService } from './../auth/auth.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdministratorsService } from './administrators.service';
import { UploadimagesadministratorsService } from './uploadimagesadministrators.service';

@Controller('administrators')
export class AdministratorsController {
  constructor(
    private readonly administratorService: AdministratorsService,
    private readonly uploadimagesadministrators: UploadimagesadministratorsService,
    private authService: AuthService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Administrator[]> {
    return this.administratorService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Administrator> {
    return this.administratorService.getById(id);
  }
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imgAdmin', maxCount: 1 },
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
    @Body() administrator: Administrator,
    @UploadedFiles() files
  ): Promise<Administrator> {
    let urlsImageLocal
    // serviço que controla o upload das imagens para o imagekit
    // o trabalho dela é pegar os arquivos que vieram na requisiçção, fazer o upload e retornar as urls para montagem do novo objeto
    urlsImageLocal = this.uploadimagesadministrators.upload(
      files.imgAdmin
    )
    var administratorNew: Administrator = Object.assign(administrator, { urlsImage: urlsImageLocal }); // gardando as novas urls das imagens já uploidadas no objeto de voluntário
    // console.log(administratorNew);
    const isCreated = await this.administratorService.create(administratorNew);
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
        { name: 'imgAdmin', maxCount: 1 },
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
    @Body() administrator: Administrator,
    @UploadedFiles() files
  ) {

    if (objectIsEmpty(files)) {
      console.log('Sem arquivos para atualizar');
      return this.administratorService.update(id, administrator);
    } else {
      let urlsImageLocal
      console.log("com arquivos para atualizar");

      this.uploadimagesadministrators.deletionSettings(id); 

      urlsImageLocal = this.uploadimagesadministrators.upload( 
        files.imgAdmin
      )

      var administratorNew: Administrator = Object.assign(administrator, { urlsImage: urlsImageLocal }); 
      return await this.administratorService.update(id, administratorNew);
    }
  }
}
