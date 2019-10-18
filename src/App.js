import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      id
      name
      tags
    }
  }
`;

const MUTATION_QUERY = gql`
  mutation {
    removeTag(input: "asd", id: 1)
  }
`;

export default function App() {
  const { loading, data } = useQuery(ALL_PEOPLE);
  const [fun] = useMutation(MUTATION_QUERY);

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <ul>
            {data.people.map(person => (
              <li key={person.id}>
                {person.name} {(person.tags || []).join(", ")}
              </li>
            ))}
          </ul>
          <button
            onClick={e => {
              e.preventDefault();
              fun({
                update: store => {
                  const data = store.readQuery({ query: ALL_PEOPLE });
                  store.writeQuery({
                    query: ALL_PEOPLE,
                    data: {
                      people: data.people.map(
                        p => (p.id == 2 ? p.tags.pop() && p : p)
                      )
                    }
                  });
                }
              });
            }}
          >
            Botun
          </button>
        </>
      )}
    </main>
  );
}
