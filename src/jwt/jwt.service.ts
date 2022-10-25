import { Injectable, Inject } from '@nestjs/common';
import { JwtModuleOptions } from './interfaces/jwt-module-options';
import { JWT_CONFIG_OTPIONS } from './jwt.constant';
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {
  constructor(@Inject(JWT_CONFIG_OTPIONS) private readonly options: JwtModuleOptions) { }

  sign(payload: object): string {
    return jwt.sign(payload, this.options.privateKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
