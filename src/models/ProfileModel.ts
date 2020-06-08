import {Document, Types} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export const PROFILE_MODEL_NAME = 'Profile'

@Schema()
export class ProfileModel extends Document {
    @Prop({ unique: true, type: Types.ObjectId })
    public id?: string

    @Prop({ unique: true })
    public email: string

    @Prop()
    public password: string

    @Prop({ unique: true })
    public name: string
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileModel)
