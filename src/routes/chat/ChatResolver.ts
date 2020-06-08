import {Inject, UseGuards} from "@nestjs/common";
import {Args, Context, Mutation, Resolver, Subscription} from "@nestjs/graphql";
import {from, Observable} from "rxjs";
import {mapTo} from "rxjs/operators";

import {PubSub} from "graphql-subscriptions";

import {AuthGuard} from "../../common/AuthGuard";
import {ChatContext} from "../../common/ChatContext";

import {Message} from "./dto/Message";
import {MessageEvent} from "./dto/MessageEvent";

const CHAT_ROOM = 'someChatRoom'

@Resolver()
export class ChatResolver {
    constructor(@Inject('PubSub')private readonly pubSub: PubSub) {
    }

    @Subscription(() => MessageEvent, { name: CHAT_ROOM })
    public subscribeForChat(): AsyncIterator<MessageEvent> {
        return this.pubSub.asyncIterator(CHAT_ROOM)
    }


    @Mutation(() => MessageEvent)
    @UseGuards(AuthGuard)
    public say(@Args() req: Message, @Context() ctx: ChatContext): Observable<MessageEvent> {
        return from(this.pubSub.publish(CHAT_ROOM, {[CHAT_ROOM]: {message: `${ctx.user.name} said: ${req.message}`}})).pipe(mapTo({ message: `you said: ${req.message}` }))
    }
}
