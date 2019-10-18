import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) }
  }
});

let peopleData = [
  { id: 1, name: "John Smith", tags: ["art", "science"] },
  { id: 2, name: "Sara Smith", tags: ["art", "science"] },
  { id: 3, name: "Budd Deey", tags: ["art", "literature"] }
];

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData
    }
  }
});

const MutationQuery = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    removeTag: {
      type: GraphQLString,
      args: {
        input: {
          type: GraphQLString
        },
        id: {
          type: GraphQLID
        }
      },
      resolve: async (source, { input, id }) => {
        console.log("input", input);
        console.log("id", id);
        console.log("source", source);
        const person = peopleData.find(p => p.id == id);
        person.tags.pop();
        peopleData = peopleData.map(p => (p.id == id ? person : p));
        console.log('new peopleData', peopleData);
        return "true";
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationQuery
});
