import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema, buildSchema } from "graphql";

const app = express();
const port = 3000;

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
