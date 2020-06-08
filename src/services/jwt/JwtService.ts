import {Injectable, InternalServerErrorException, Logger, UnauthorizedException} from "@nestjs/common";
import { sign, SignOptions, verify } from 'jsonwebtoken';

import {TokenPayload} from "../../common/TokenPayload";

import {DEFAULT_TOKEN_OPTIONS, JWT_PRIV_KEY, JWT_PUB_KEY} from "../../local.env";

const TOKEN_ALGORITHM = 'RS256'

@Injectable()
export class JwtService {
    private readonly logger = new Logger('JwtService')

    public generateTokenWith(payload: TokenPayload, options: SignOptions = DEFAULT_TOKEN_OPTIONS): string {
        try {
            return sign(payload, JWT_PRIV_KEY, { ...options, algorithm: TOKEN_ALGORITHM })
        } catch (err) {
            this.logger.error('Error in sign token:', err)

            throw new InternalServerErrorException()
        }
    }

    public decodeToken(token: string): TokenPayload {
        try {
            return verify(token, JWT_PUB_KEY, {algorithms: [TOKEN_ALGORITHM] }) as TokenPayload
        } catch (e) {
            const msg = 'Token is invalid'
            this.logger.error(msg, e)

            throw new UnauthorizedException(msg)
        }
    }
}
