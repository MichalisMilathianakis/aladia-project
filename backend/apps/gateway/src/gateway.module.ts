import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import configuration from '../../../config/configuration';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10, //limit per IP per ttl
        },
      ],
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('tcp.host'),
            port: config.get<number>('tcp.port'),
          },
        }),
      },
    ]),
  ],
  controllers: [GatewayController, HealthController],
  providers: [GatewayService],
})
export class GatewayModule {}
