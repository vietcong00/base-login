import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
    AuthorizationType,
    AUTHORIZATION_TYPE,
    MongoCollection,
} from 'src/common/constants';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/common/schemas/base.shema';
import { ObjectId, Types } from 'mongoose';
export type UserTokenDocument = UserToken & Document;

@Schema({
    timestamps: true,
    collection: MongoCollection.USER_TOKENS,
})
export class UserToken extends BaseSchema {
    @Prop({
        required: true,
        type: String,
        trim: true,
    })
    token: string;

    @Prop({
        required: true,
        type: String,
        trim: true,
    })
    hashToken: string;

    @Prop({
        required: true,
        type: String,
        enum: AuthorizationType,
        default: AUTHORIZATION_TYPE,
    })
    type: string;

    @Prop({ required: true, type: Types.ObjectId })
    userId: ObjectId;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
