import express, {
	type Request,
	type Response,
	type Application,
} from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";

const app = express();
const PORT = 3000;

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
	await server.start();
	server.applyMiddleware({ app } as any);

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
		console.log(
			`GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`,
		);
	});
})();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, TypeScript with Express!");
});
