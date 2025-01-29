import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from 'type-graphql';
import { User } from "./User";

@ObjectType()
export class Player {
  @Field()
  @prop({ ref: () => User, required: true, indexes:true })
  userId!: Ref<User>;

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