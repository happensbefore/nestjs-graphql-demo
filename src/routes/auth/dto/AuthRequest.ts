import {ArgsType, Field} from "@nestjs/graphql";

@ArgsType()
export class AuthRequest {

    @Field({nullable: false})
    email: string

    @Field({nullable: false})
    password: string
}
