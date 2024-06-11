import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($body: String!, $roomId: String!) {
    sendMessage(body: $body, roomId: $roomId) {
      id
      body
      createdAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
