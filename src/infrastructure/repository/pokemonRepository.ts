import { AirtableBase } from "airtable/lib/airtable_base";

import { Pokemon } from "../../domain/pokemon";
import { IPokemonRepository } from "../../usecase/repositoryInterface/IPokemonRepository";

export class PokemonRepository implements IPokemonRepository {
  public constructor(private readonly base: AirtableBase) {}

  public findAll = async (): Promise<Pokemon[]> => {
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

  public save = async (pokemon: Pokemon): Promise<Pokemon> => {
    const props = pokemon.getAllPropertiesInRepository();

    await this.base("tblNS9Q7cLZNW730b").create([
      {
        fields: {
          Id: props.id,
          Name: props.name,
          Type1: props.type1,
          Type2: props.type2,
        },
      },
    ]);

    return pokemon;
  };
}
