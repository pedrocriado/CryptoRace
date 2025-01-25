import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from "./User";
import { Game } from "./Game";

@ObjectType()
export class Player {
  @Field()
  @prop({ ref: () => User, required: true, indexes:true })
  userId!: Ref<User>;

  @Field()
  @prop({ ref: () => Game, required: true, indexes:true })
  gameId!: Ref<Game>;

  @Field()
  @prop({ default: {} })
  solvedWords!: Map<string, string>;

  @Field()
  @prop({ default: null })
  timeCompleted!: number | null;
}

export const PlayerModel = getModelForClass(Player, {
  schemaOptions: { collection: "Players" },
});