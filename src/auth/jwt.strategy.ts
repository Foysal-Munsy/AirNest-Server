/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  JwtFromRequestFunction,
  StrategyOptions,
} from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const bearerExtractor: JwtFromRequestFunction = (req: Request) => {
      const authHeader = req?.headers?.authorization;
      if (!authHeader) return null;
      const [scheme, token] = authHeader.split(' ');
      if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
      return token;
    };

    const options: StrategyOptions = {
      jwtFromRequest: bearerExtractor,
      ignoreExpiration: false,
      secretOrKey: 'super-secret',
    };
    super(options);
  }

  validate(payload: { sub: number; email: string }) {
    return { userId: payload.sub, email: payload.email };
  }
}
