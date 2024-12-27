import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Room } from "./Room";

export class Game {
  @prop({ ref: () => Room, required: true })
  public roomId!: Ref<Room>;

  @prop()
  public cryptogram?: string;
}

export const GameModel = getModelForClass(Game, {
  schemaOptions: { collection: "Games" },
});