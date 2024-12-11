const books = [
	{
		title: "The wizard of Oz",
		author: "L. Frank Baum",
	},
	{
		title: "The wizard of Oz",
		author: "Gregory Maguire",
	},
];

export const typeDefs = `#graphql
	type Book {
		title: String!
		author: String!
	}

	type Query {
		books: [Book!]
	}
`;

export const resolvers = {
	Query: {
		books: () => books,
	},
};
