import { prop, getModelForClass } from "@typegoose/typegoose";

export class Sentence {
  @prop()
  sentence!: string;
}

export const SentenceModel = getModelForClass(Sentence, {
  schemaOptions: { collection: "Sentence" },
});