import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {GqlExecutionContext} from "@nestjs/graphql";

import {JwtService} from "../services/jwt/JwtService";
import {ChatContext} from "./ChatContext";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {
    }

    public canActivate(context: ExecutionContext): Observable<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext()
        const token = ctx.req.headers['authorization']

        if (!token) {
            return of(false)
        }

        return of(this.jwtService.decodeToken(token)).pipe(
            map(data => {
                const userContext: ChatContext = {
                    user: {
                        email: data.email,
                        name: data.name
                    }
                }

                Object.assign(ctx,  userContext)

                return true
            })
        )
    }

}
