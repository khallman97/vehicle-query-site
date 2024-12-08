"use client"
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

// Set client to local host 
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});



export default client;