import {Field, Int, ObjectType} from "@nestjs/graphql";

import {Profile} from "../../user/dto/Profile";

@ObjectType('AuthPayload')
export class AuthResponse {
    @Field(() => Int)
    id?: number

    @Field(() => Profile, {nullable: false})
    profile: Profile

    @Field()
    token: string
}
