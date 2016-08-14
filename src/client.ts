import ApolloClient, { createNetworkInterface } from 'apollo-client';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface('https://api.graph.cool/simple/v1/__APIURL__')
});