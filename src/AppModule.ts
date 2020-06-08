import {Module, UnauthorizedException} from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql";

import { join } from 'path';

import {CommonModule} from "./services/CommonModule";
import {ResolversModule} from "./routes/ResolversModule";
import {JwtService} from "./services/jwt/JwtService";

const subscriptionAuthChecker = new JwtService()

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            installSubscriptionHandlers: true,
            subscriptions: {
                // todo: need to think about to patch code subscription implementation or use/implement another protocol
                onConnect: (connectionParams) => {
                    const token = connectionParams['Authorization']

                    if (!token) {
                        throw new UnauthorizedException()
                    }

                    subscriptionAuthChecker.decodeToken(token)
                }
            }
        }),
        CommonModule,
        ResolversModule
    ]
})
export class AppModule {}
