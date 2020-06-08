import {ArgsType, Field} from "@nestjs/graphql";

@ArgsType()
export class Message {
    @Field({nullable: false})
    message: string
}
