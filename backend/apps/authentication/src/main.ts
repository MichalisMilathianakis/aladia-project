import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.TCP_HOST ?? '0.0.0.0',
        port: parseInt(process.env.TCP_PORT ?? '4000', 10),
      },
    },
  );

  await app.listen();
  console.log('Authentication microservice listening on TCP port', process.env.TCP_PORT ?? 4000);
}

bootstrap();
