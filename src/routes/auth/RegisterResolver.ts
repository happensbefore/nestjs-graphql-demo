import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {RegisterRequest} from "./dto/RegisterRequest";
import {RegisterResponse} from "./dto/RegisterResponse";

import {ProfileService} from "../../services/profile/ProfileService";

import {ProfileModel} from "../../models/ProfileModel";

@Resolver()
export class RegisterResolver {
    constructor(private readonly profileService: ProfileService) {
    }

    @Mutation(() => RegisterResponse)
    public register(@Args() req: RegisterRequest): Observable<RegisterResponse> {
        return this.profileService.saveProfile(<ProfileModel>{
            name: req.name,
            email: req.email,
            password: req.password
        }).pipe(
            map(() => ({ result: 'SUCCESS', message: '' }))
        )
    }
}
