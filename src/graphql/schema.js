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
    tags: { type: [GraphQLString] }
  }
});

const peopleData = [
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

export const schema = new GraphQLSchema({ query: QueryType });
