

- tạo source : nest g resource video --no-spec
- npm i class-validator class-transformer : validate input đầu vào và ra.


- npm i @nestjs/config : load ra biến môi trường trong file .env.

```
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}) // load tất cả biến môi trường và sử dụng.
    ,VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// main.ts


```


# Cài swagger
- npm i @nestjs/swagger swagger-ui-express


```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);  // lấy config service từ config.
  // add validation input 
  app.useGlobalPipes(new ValidationPipe());

  // config swagger
    
  const configSwagger = new DocumentBuilder()
  .setTitle("API Youtube mini")
  .setDescription("Danh sách API youtube mini")
  .setVersion("1.0")
  .build() // builder pattern;

  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("swagger", app, swagger);


  const port = configService.get<number>('PORT') || 8080;

  await app.listen(port);
}
bootstrap();
```

# Tạo Auth
- nest g resource auth ---no-spec

- thư viện auth : 
- npm i @nestjs/passport passport passport-local 
- npm i @nestjs/jwt passport-jwt
- npm i -D @types/passport-jwt


# uplaod file 
- npm i multer @types/multer

- Dùng cloudinary : npm i cloudinary multer-storage-cloudinary

# Tạo key bất đối xứng.
- openssl rsa -in private.key -outform PEM -pubout -out public.key
- openssl genrsa -out private.key 2048
 