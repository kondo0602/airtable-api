import { IPokemonRepository } from "./repositoryInterface/IPokemonRepository";
import { Pokemon } from "../domain/pokemon";

export class PostPokemonUsecase {
  public constructor(private readonly pokemonRepo: IPokemonRepository) {}

  public do = async (pokemon: Pokemon) => {
    const result = this.pokemonRepo.save(pokemon);
    return result;
  };
}
