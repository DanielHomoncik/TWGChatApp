import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = createHttpLink({
  uri: 'https://chat.thewidlarzgroup.com/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE3MTk5OTc2MzMsImlhdCI6MTcxNzU3ODQzMywiaXNzIjoiY2hhdGx5IiwianRpIjoiMDNjOGZkYjItMmMyMy00MGVkLTkwZGQtYWU1OGFkYmM0YzUzIiwibmJmIjoxNzE3NTc4NDMyLCJzdWIiOiJkODNjNWNkOC02ZjVhLTRmNmMtOThkZC1iYWNkMjI0ZjM0NjMiLCJ0eXAiOiJhY2Nlc3MifQ.VKHXrmYyoUdXO3sZQUttsDB7lSdYvLj1fg4Of41vTPAQw3J7kbMd8kDDyp4D-iWLpbAZYuEf1HoWdfLl-OPS2g`
    }
  };
});

const wsLink = new WebSocketLink({
  uri: `wss://chat.thewidlarzgroup.com/socket`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE3MTk5OTc2MzMsImlhdCI6MTcxNzU3ODQzMywiaXNzIjoiY2hhdGx5IiwianRpIjoiMDNjOGZkYjItMmMyMy00MGVkLTkwZGQtYWU1OGFkYmM0YzUzIiwibmJmIjoxNzE3NTc4NDMyLCJzdWIiOiJkODNjNWNkOC02ZjVhLTRmNmMtOThkZC1iYWNkMjI0ZjM0NjMiLCJ0eXAiOiJhY2Nlc3MifQ.VKHXrmYyoUdXO3sZQUttsDB7lSdYvLj1fg4Of41vTPAQw3J7kbMd8kDDyp4D-iWLpbAZYuEf1HoWdfLl-OPS2g`
      }
    }
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
