import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType('Profile')
export class Profile {
    @Field(() => Int)
    id?: number

    @Field()
    name: string
}
