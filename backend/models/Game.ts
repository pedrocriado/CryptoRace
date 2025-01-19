import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from 'type-graphql';
import { Lobby } from "./Lobby";

@ObjectType()
export class Game {
  @Field(_type => Lobby)
  @prop({ ref: () => Lobby, required: true })
  public roomId!: Ref<Lobby>;

  @Field({ nullable: true})
  @prop()
  public cryptogram?: string;
}

export const GameModel = getModelForClass(Game, {
  schemaOptions: { collection: "Games" },
});