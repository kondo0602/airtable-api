import { AirtableBase } from "airtable/lib/airtable_base";

import { Pokemon } from "../../domain/pokemon";
import { IPokemonRepository } from "../../usecase/repositoryInterface/IPokemonRepository";

export class PokemonRepository implements IPokemonRepository {
  public constructor(private readonly base: AirtableBase) {}

  public findAll = async () => {
    const records = await this.base("tblNS9Q7cLZNW730b")
      .select({ view: "Grid view" })
      .all();

    const pokemons = records.map((record) => {
      return Pokemon.reconstruct({
        id: record.get("Id") as string,
        name: record.get("Name") as string,
        type1: record.get("Type1") as string,
        type2: record.get("Type2") as string,
      });
    });

    return pokemons;
  };

  public save = async () => {
    return null;
  };
}
