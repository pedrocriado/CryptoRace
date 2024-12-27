import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { Game } from "./Game";

export class Player {
  @prop({ ref: () => User, required: true })
  userId!: Ref<User>;

  @prop({ ref: () => Game, required: true })
  gameId!: Ref<Game>;

  @prop({ default: {} })
  solvedWords!: Map<string, string>;

  @prop({ default: null })
  timeCompleted!: number | null;
}

export const PlayerModel = getModelForClass(Player, {
  schemaOptions: { collection: "Players" },
});