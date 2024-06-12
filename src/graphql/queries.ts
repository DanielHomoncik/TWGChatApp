import { gql } from '@apollo/client';


export const GET_ROOMS = gql`
  query {
    
      usersRooms {
        rooms {
          id
          name
        }
        user {
          email
          firstName
          lastName
          id
          role
        }
      }
    
      user {
        email
        firstName
        lastName
        id
        role
      }
     
    
    
  }
`;


export const GET_ROOM_MESSAGES = gql`
  query GetRoomMessages($id: ID!) {
    room(id: $id) {
      id
      messages {
        id
        body
        user {
          id
          firstName
          lastName
        }
        insertedAt
      }
    }
  }
`;
