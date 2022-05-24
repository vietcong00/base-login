import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { INPUT_TEXT_MAX_LENGTH, MongoCollection } from 'src/common/constants';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/common/schemas/base.shema';
export type UserDocument = User & Document;

@Schema({
    timestamps: true,
    collection: MongoCollection.USERS,
})
export class User extends BaseSchema {
    @Prop({
        required: true,
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        trim: true,
    })
    fullName: string;

    @Prop({
        required: true,
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        trim: true,
    })
    email: string;

    @Prop({
        required: false,
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        trim: true,
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
