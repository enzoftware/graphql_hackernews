const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.google.com',
    description: 'Ggoogle'
}];

let idCount = links.length;

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
        feed: () => links,
        link: (parent, args) => {
            let id = args.id;
            return findLinkById(id);
        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link);
            return link;
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
});

server.start(() => console.log(`Server is running on localhost 4000`));