import { IPokemonRepository } from "./repositoryInterface/IPokemonRepository";

export class GetAllPokemonsUsecase {
  public constructor(private readonly pokemonRepo: IPokemonRepository) {}

  public do = async () => {
    const pokemons = this.pokemonRepo.findAll();
    return pokemons;
  };
}
