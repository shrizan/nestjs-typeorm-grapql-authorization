import { Module, DynamicModule, Global } from '@nestjs/common';
import { JwtModuleOptions } from './interfaces/jwt-module-options';
import { JWT_CONFIG_OTPIONS } from './jwt.constant';
import { JwtService } from './jwt.service';

@Module({
})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        JwtService,
        {
          provide: JWT_CONFIG_OTPIONS,
          useValue: options
        }
      ]
    };
  }
}
