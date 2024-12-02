import express, { type Request, type Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema, buildSchema } from "graphql";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

// let sampleUsers = [

// ]
