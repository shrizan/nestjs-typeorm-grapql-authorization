import { NestMiddleware, Injectable } from "@nestjs/common";
import { Response, Request, NextFunction } from "express";
import { UserService } from "src/user/user.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {

  }

  async use(req: Request, res: Response, next: NextFunction) {
    if ("x-jwt" in req.headers) {
      const token = req.headers["x-jwt"];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
        try {
          const user = await this.userService.findById(decoded["id"]);
          req["user"] = user;
        } catch (error) {
          console.log(error);
        }
      }
    }
    next();
  }

}