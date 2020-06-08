import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType('MessageEvent')
export class MessageEvent {
    @Field()
    public message: string
}
