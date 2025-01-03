import { pre, prop, getModelForClass, DocumentType } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, Int, ObjectType } from 'type-graphql';
import bcrypt from "bcryptjs";

@pre<User>("save", async function () {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
})

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
    winCount?: number;

    @Field(() => Map<string, number>)
    @prop({ default: {} }) 
    bestTimes?: Map<string, number>;

    @Field()
    @prop({ default: Date.now })
    createdAt?: Date;

    public async authenticate(this: DocumentType<User>, password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
      }
}

export const UserModel = getModelForClass(User, {
    schemaOptions: { collection: "Users" },
});