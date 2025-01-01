import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { Field, Int, ObjectType } from 'type-graphql';

export class Room {
  @Field()
  @prop({ required: true })
  public roomName!: string;

  @Field(_type => User)
  @prop({ ref: () => User, required: true })
  public createdBy!: Ref<User>;

  @Field()
  @prop({ ref: () => User, default: [] })
  public participants!: Ref<User>[];

  @prop({ default: false })
  public gameStarted!: boolean;

  @Field()
  @prop({ default: Date.now })
  public createdAt!: Date;

  @Field(_type => [String])
  @prop({ default: [] })
  public cryptograms!: string[];
}

export const RoomModel = getModelForClass(Room, {
  schemaOptions: { collection: "Rooms" },
});