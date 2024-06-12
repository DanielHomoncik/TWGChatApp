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
/////////////////////

// Tak powinno wyglądac logowanie ale mój utworzony urzytkownik nie ma czatów więc wszyscy wchodza na ten token który miałem na samym początku żeby była lista użytkowników
// i dało się to sprawdzić wiem ze zakomentowany kod to błąd ale nie wiedziałem jak to inaczje rozwiązać żeby mieć czaty i jednoczesniej móc się logować na nowych urzytkowników
// należy odkomentować tą częśc i zakomenetować to co jest obecnie i to samo  w LoginScreen
//////////////////

// src/apollo.ts
// import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { getMainDefinition } from '@apollo/client/utilities';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const httpLink = createHttpLink({
//   uri: 'https://chat.thewidlarzgroup.com/api/graphql',
// });

// const authLink = setContext(async (_, { headers }) => {
//   const token = await AsyncStorage.getItem('token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const wsLink = new WebSocketLink({
//   uri: `wss://chat.thewidlarzgroup.com/socket`,
//   options: {
//     reconnect: true,
//     connectionParams: async () => {
//       const token = await AsyncStorage.getItem('token');
//       return {
//         headers: {
//           authorization: token ? `Bearer ${token}` : '',
//         },
//       };
//     },
//   },
// });

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   authLink.concat(httpLink),
// );

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache(),
// });

// export default client;
