import {Module} from "@nestjs/common";
import {ModelDefinition, MongooseModule} from "@nestjs/mongoose";

import {PROFILE_MODEL_NAME, ProfileSchema} from "../models/ProfileModel";

import {JwtService} from "./jwt/JwtService";
import {ProfileService} from "./profile/ProfileService";

import {MONGO_CONNECTION} from "../local.env";

const MODELS: ModelDefinition[] = [{ name: PROFILE_MODEL_NAME, schema: ProfileSchema }]

const PROVIDERS = [JwtService, ProfileService]

@Module({
    imports: [MongooseModule.forRoot(MONGO_CONNECTION), MongooseModule.forFeature(MODELS)],
    providers: PROVIDERS,
    exports: PROVIDERS
})
export class CommonModule {

}
