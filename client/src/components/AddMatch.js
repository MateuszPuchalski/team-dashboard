import React from "react";
import { Formik, Field, Form } from "formik";
import { useQuery, useMutation, gql } from "@apollo/client";

const CLUBS = gql`
  query {
    currentUser {
      id
    }
    clubMany {
      id
      name
    }
  }
`;

const ADD_MATCH = gql`
  mutation AddMatch(
    $addedBy: String
    $homeTeam: String!
    $awayTeam: String!
    $homeScore: Int!
    $awayScore: Int!
    $ytId: String
  ) {
    addMatch(
      addedBy: $addedBy
      homeTeam: $homeTeam
      awayTeam: $awayTeam
      homeScore: $homeScore
      awayScore: $awayScore
      ytId: $ytId
    ) {
      id
    }
  }
`;

export default function AddMatch() {
  const { loading, error, data } = useQuery(CLUBS);
  const [addMatch, { data: addedMatchData }] = useMutation(ADD_MATCH);
  if (loading) return `Loading...`;
  console.log(data);
  return (
    <Formik
      initialValues={{
        addedBy: data.currentUser.id,
        homeTeam: data.clubMany[0].id,
        awayTeam: data.clubMany[0].id,
        homeScore: 0,
        awayScore: 0,
        ytId: "",
      }}
      onSubmit={(values) => addMatch({ variables: { ...values } })}
    >
      <Form>
        <label htmlFor="homeTeam">Home Team</label>
        <Field as="select" id="homeTeam" name="homeTeam" placeholder="">
          {data.clubMany.map((club) => (
            <option value={`${club.id}`}>{`${club.name}`}</option>
          ))}
        </Field>

        <label htmlFor="homeScore">Home Score</label>
        <Field type="number" id="homeScore" name="homeScore" placeholder="" />

        <label htmlFor="awayTeam">Away Team</label>
        <Field as="select" id="awayTeam" name="awayTeam" placeholder="">
          {data.clubMany.map((club) => (
            <option value={`${club.id}`}>{`${club.name}`}</option>
          ))}
        </Field>

        <label htmlFor="awayScore">Away Score</label>
        <Field type="number" id="awayScore" name="awayScore" placeholder="" />

        <label htmlFor="ytId">Match Youtube Link</label>
        <Field id="ytId" name="ytId" placeholder="" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
