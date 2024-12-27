import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";

export class Room {
  @prop({ required: true })
  public roomName!: string;

  @prop({ ref: () => User, required: true })
  public createdBy!: Ref<User>;

  @prop({ ref: () => User, default: [] })
  public participants!: Ref<User>[];

  @prop({ default: false })
  public gameStarted!: boolean;

  @prop({ default: Date.now })
  public createdAt!: Date;

  @prop({ default: [] })
  public cryptograms!: string[];
}

export const RoomModel = getModelForClass(Room, {
  schemaOptions: { collection: "Rooms" },
});