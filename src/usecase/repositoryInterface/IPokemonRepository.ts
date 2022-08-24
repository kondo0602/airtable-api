import { Pokemon } from "../../domain/pokemon";

export type IPokemonRepository = {
  findAll(): Promise<Pokemon[] | null>;
  save(): Promise<null>;
};
