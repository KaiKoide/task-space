import express, {
	type Request,
	type Response,
	type Application,
} from "express";
import { type GraphQLSchema, buildSchema } from "graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./schema.js";

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 3000 },
});

console.log(`🚀  Server ready at: ${url}`);
