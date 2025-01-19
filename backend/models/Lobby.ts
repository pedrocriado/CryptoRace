import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { Field, Int } from 'type-graphql';

export class Lobby {
  @Field()
  @prop({ required: true })
  public lobbyName!: string;

  @Field(_type => User)
  @prop({ ref: () => User, required: true })
  public createdBy!: Ref<User>;

  @Field(_type => [User, String])
  @prop({ default: [] })
  public participants!: [Ref<User>, String];

  @Field()
  @prop({ default: false })
  public gameStarted!: boolean;

  @Field()
  @prop({ default: false })
  public private!: boolean;

  @Field()
  @prop({ default: Date.now })
  public createdAt!: Date;

  @Field(_type => [String])
  @prop({ default: [] })
  public cryptograms!: string[];

  @Field(_type => Int)
  @prop({ default:  3 })
  public playerCap!: Number;
}

export const LobbyModel = getModelForClass(Lobby, {
  schemaOptions: { collection: "Lobbies" },
});