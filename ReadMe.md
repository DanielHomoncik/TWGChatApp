# React Native Expo Project


## Introduction
This is a React Native project using Expo for building cross-platform mobile applications. Utilizing GraphQL for API communication.
 
## Attention !!!
The current login process is designed to navigate to the user after logging in with the initially provided token. However, the token is currently stored in an improper way as it is simply hardcoded. I've added a comment to indicate that I understand how it should work. If an account were created by me in this manner, it would not have any chats and there would be no way to verify it. Therefore, after logging into the account, we automatically log into a test account provided for testing purposes.

 LoginScren.tsx and  Client.ts

## Requirements
- Node.js v18.15.0
- npm v9.6.4
- Expo CLI

## Setup

### 1. Start
```sh
git clone <repository-url>
cd TWGChatApp 
npm install
npx expo start or npm start