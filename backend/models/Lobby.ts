import { pre, prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import bcrypt from "bcryptjs";
import { Field, Int } from 'type-graphql';

@pre<Lobby>("save", async function () {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
})

export class Lobby {
  @Field()
  @prop({ required: true })
  public lobbyName!: string;

  @Field(_type => User )
  @prop({ ref: () => User,required: true, indexes: true })// added indexes for faster queries
  public createdBy!: Ref<User>;

  @Field()
  @prop({ required: true })
  public createrName!: String;

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

  @prop({ required: false }) // Password is only required for private lobbies.
  public password?: string;

  @Field()
  @prop({
    required: true,
    default: () => new Date(Date.now() + 60 * 60 * 3000), // Default TTL: 3 hours from creation.
    expires: 0, // TTL index: automatically delete expired lobbies.
  })
  public expiresAt!: Date;

  public validateLobbyPassword(password: string): Promise<boolean> {
    if (!this.password || !password) {
      throw new Error("Invalid lobby or password");
    }
  
    return bcrypt.compare(password, this.password);
  }
}

export const LobbyModel = getModelForClass(Lobby, {
  schemaOptions: { collection: "Lobbies" },
});