import { Pokemon } from "../../domain/pokemon";

export type IPokemonRepository = {
  findAll(): Promise<Pokemon[] | null>;
  save(pokemon: Pokemon): Promise<Pokemon>;
};
