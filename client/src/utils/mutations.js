import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login({$or: username: String! ,email: String!}, password: String!){
    token
    user{
        _id
        username
    }
    }
`;

export const ADD_USER = gql`
    mutation addUser(username: String!, email: String!, password: String!){
    token
    user {
        _id
        username
    }
    }`;

export const SAVE_BOOK = gql`
    mutation saveBooksaveBook( {bookId: ID!, authors: String, description: String!, image: String, link: String, title: String!}){
        {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            title
            description
            image
            link
        }
        bookCount
        }
    }
`;

export const REMOVE_BOOK = gql`({bookId: ID!}){
            {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            title
            description
            image
            link
        }
        bookCount
        }
}`;
