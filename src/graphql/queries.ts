import { gql } from '@apollo/client';


export const GET_ROOMS = gql`
  query {
    usersRooms {
      user {
        email
        firstName
        lastName
        id
        role
      }
      rooms {
        id
        name
      }
    }
  }
`;



export const GET_ROOM_MESSAGES = gql`
  query GetRoomMessages($id: ID!) {
    room(id: $id) {
      messages {
        id
        text
        createdAt
        user {
          id
          firstName
        }
      }
    }
  }
`;
