import {Module} from "@nestjs/common";
import {PubSub} from "graphql-subscriptions";

import {CommonModule} from "../services/CommonModule";

import {ProfileResolver} from "./user/ProfileResolver";
import {AuthResolver} from "./auth/AuthResolver";
import {RegisterResolver} from "./auth/RegisterResolver";
import {ChatResolver} from "./chat/ChatResolver";

const RESOLVERS = [
    {
        provide: 'PubSub',
        useValue: new PubSub()
    },
    RegisterResolver,
    AuthResolver,
    ProfileResolver,
    ChatResolver
]

@Module({
    imports: [CommonModule],
    providers: RESOLVERS,
    exports: RESOLVERS
})
export class ResolversModule {}
