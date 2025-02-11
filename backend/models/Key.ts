import { prop, getModelForClass } from "@typegoose/typegoose";

export class Key {
  @prop()
  key!: string;
}

export const KeyModel = getModelForClass(Key, {
  schemaOptions: { collection: "Key" },
});