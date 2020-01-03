const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');


function findLinkById(id) {
    let link = {};
    links.forEach((element) => {
        if (element.id == id) {
            link = element;
        }
    });
    return link;
}

const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews`,
        feed: (root, args, context, info) => {
            return context.prisma.links();
        },
        link: (parent, args) => {
            let id = args.id;
            return findLinkById(id);
        }
    },
    Mutation: {
        post: (parent, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            });
        },
        updateLink: (parent, args) => {
            let id = args.id;
            let link = findLinkById(id);
            link.url = args.url;
            link.description = args.description;
            return link;

        },
        deleteLink: (parent, args) => {
            let id = args.id;
            let link = findLinkById(id);
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
});

server.start(() => console.log(`Server is running on localhost 4000`));