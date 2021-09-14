import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as ImageKit from 'imagekit'
//var ImageKit = require("imagekit");
//const fileUpload = require('express-fileupload');


export var imagekit = new ImageKit({
    publicKey : process.env.PUBLICKEY,
    privateKey : process.env.PRIVATEKEY,
    urlEndpoint : process.env.URL_ENDPOINT
});




async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });

  app.enableCors();
  await app.listen(3000);
}
bootstrap();


// implementando o file uploads editando a linha 19 