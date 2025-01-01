import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
    @Field()
    readonly _id!: Types.ObjectId;

    @Field()
    @prop({ unique: true, required: true })
    username!: string; // Use `!` if it's required, not `?`.

    @prop({ unique: true, required: true })
    email!: string;

    @prop({ required: true })
    password!: string;

    @Field(_type => Int)
    @prop({ default: 0 })
    winCount!: number;

    @Field(() => Map<string, number>)
    @prop({ default: {} }) 
    bestTimes!: Map<string, number>;

    @Field()
    @prop({ default: Date.now })
    createdAt!: Date;
}

export const UserModel = getModelForClass(User, {
    schemaOptions: { collection: "Users" },
});