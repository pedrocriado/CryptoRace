import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from 'type-graphql';
import { Room } from "./Room";

@ObjectType()
export class Game {
  @Field(_type => Room)
  @prop({ ref: () => Room, required: true })
  public roomId!: Ref<Room>;

  @Field({ nullable: true})
  @prop()
  public cryptogram?: string;
}

export const GameModel = getModelForClass(Game, {
  schemaOptions: { collection: "Games" },
});