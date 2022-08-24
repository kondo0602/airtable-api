// import Airtable from "airtable";
import fastify from "fastify";

import { initializeAirTable } from "../src/infrastructure/initializeAirTable";
import { Pokemon } from "../src/domain/pokemon";

const server = fastify({ logger: true });

server.get("/", async (request, reply) => {
  const base = initializeAirTable();

  const records = await base("tblNS9Q7cLZNW730b")
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

  reply.type("application/json").code(200);
  return { pokemons };
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  server.log.info(`sercver listening on ${address}`);
});
