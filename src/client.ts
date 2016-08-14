import ApolloClient, { createNetworkInterface } from 'apollo-client';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface('https://api.graph.cool/simple/v1/cirpiog0j09jw0156xp6me5wo')
});