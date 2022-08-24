import fastify from "fastify";

import { initializeAirTable } from "../src/infrastructure/initializeAirTable";
import { PokemonRepository } from "../src/infrastructure/repository/pokemonRepository";
import { getAllPokemonsUsecase } from "../src/usecase/getAllPokemonsUsecase";

const server = fastify({ logger: true });

server.get("/", async (request, reply) => {
  const base = initializeAirTable();

  const pokemonRepo = new PokemonRepository(base);

  const getAllPokemonUsecase = new getAllPokemonsUsecase(pokemonRepo);
  const pokemons = await getAllPokemonUsecase.do();

  reply.type("application/json").code(200);
  return { pokemons };
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  server.log.info(`sercver listening on ${address}`);
});
