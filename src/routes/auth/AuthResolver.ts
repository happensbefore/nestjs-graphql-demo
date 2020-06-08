import {UnauthorizedException} from "@nestjs/common";
import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {AuthRequest} from "./dto/AuthRequest";
import {AuthResponse} from "./dto/AuthResponse";

import {ProfileService} from "../../services/profile/ProfileService";
import {JwtService} from "../../services/jwt/JwtService";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly jwtService: JwtService,
        private readonly profileService: ProfileService
    ) {
    }

    @Mutation(() => AuthResponse)
    public login(@Args()req: AuthRequest): Observable<AuthResponse> {
        return this.profileService.getProfile(req.email).pipe(
            map(res => {
                if (res.password !== req.password) {
                    throw new UnauthorizedException('Password is wrong')
                }

                return {
                    profile: {
                        name: res.name,
                    },
                    token: this.jwtService.generateTokenWith({ email: res.email, name: res.name })
                }
            })
        )
    }
}
