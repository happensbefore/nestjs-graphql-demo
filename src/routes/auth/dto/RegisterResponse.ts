import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType('RegisterPayload')
export class RegisterResponse {
    @Field(() => Int)
    id?: number

    @Field()
    public result: string

    @Field()
    public message: string
}
