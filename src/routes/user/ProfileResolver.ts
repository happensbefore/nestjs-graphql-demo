import {Context, Query, Resolver} from "@nestjs/graphql";
import {UseGuards} from "@nestjs/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {AuthGuard} from "../../common/AuthGuard";
import {ChatContext} from "../../common/ChatContext";

import {Profile} from "./dto/Profile";

import {ProfileService} from "../../services/profile/ProfileService";

@Resolver(() => Profile)
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {
    }

    @Query(() => Profile, {name: 'myProfile'})
    @UseGuards(AuthGuard)
    public getProfile(@Context() ctx: ChatContext): Observable<Profile> {
        return this.profileService.getProfile(ctx.user.email).pipe(
            map(({name}) => ({name}))
        )
    }
}
