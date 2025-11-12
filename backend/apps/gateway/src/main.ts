import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(','),
  });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Aladia API Gateway')
    .setDescription('API Gateway for Authentication Microservice')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = configService.get<number>('port') ?? 3000;
  await app.listen(port);
  console.log(`Gateway running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/docs`);
  console.log(`Health check available at http://localhost:${port}/health`);
}
void bootstrap();
