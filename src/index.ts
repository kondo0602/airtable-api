import fastify from "fastify";

import { initializeAirTable } from "../src/infrastructure/initializeAirTable";
import { PokemonRepository } from "../src/infrastructure/repository/pokemonRepository";
import { GetAllPokemonsUsecase } from "../src/usecase/getAllPokemonsUsecase";
import { PostPokemonUsecase } from "../src/usecase/postPokemonUsecase";
import { Pokemon } from "./domain/pokemon";

const server = fastify({ logger: true });

server.get("/", async (request, reply) => {
  const base = initializeAirTable();

  const pokemonRepo = new PokemonRepository(base);

  const getAllPokemonUsecase = new GetAllPokemonsUsecase(pokemonRepo);
  const pokemons = await getAllPokemonUsecase.do();

  reply.type("application/json").code(200);
  return { pokemons };
});

type IBody = {
  id: string;
  name: string;
  type1: string;
  type2?: string;
};

server.post<{ Body: IBody }>("/", async (request, reply) => {
  const base = initializeAirTable();

  const pokemonRepo = new PokemonRepository(base);

  const postPokemonUsecase = new PostPokemonUsecase(pokemonRepo);

  const pokemon = Pokemon.create({
    id: request.body.id,
    name: request.body.name,
    type1: request.body.type1,
    type2: request.body.type2,
  });

  const result = await postPokemonUsecase.do(pokemon);

  return { result };
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  server.log.info(`sercver listening on ${address}`);
});
