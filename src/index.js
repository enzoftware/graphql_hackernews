import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query{
        info: String!
    }
`;

const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews`
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => console.log(`Server is running on localhost 3000`));