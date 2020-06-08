import {ArgsType, Field} from "@nestjs/graphql";

@ArgsType()
export class RegisterRequest {

    @Field({nullable: false})
    email: string

    @Field({nullable: false})
    password: string

    @Field({nullable: false})
    name: string
}
