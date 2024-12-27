import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop({ unique: true, required: true })
  username!: string; // Use `!` if it's required, not `?`.

  @prop({ required: true })
  password!: string;

  @prop({ default: 0 })
  winCount!: number;

  @prop({ default: {} }) // Use type function for `Map`.
  bestTimes!: Map<string, number>;

  @prop({ default: Date.now })
  createdAt!: Date;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { collection: "Users" },
});