//WIP email validation

const typeDefs = `
typw User{
    _id: ID
    username: String!
    email: String!
    bookCount: int
    savedBooks: [Book]
}

type Book 
    {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: Sting!
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query{
        me: User
    }
    type Mutation{
        addUser(username: String!, email: String!, password: String!): Auth
        login({$or: username: String! ,email: String!}, password: String!): Auth
        saveBook: {bookId: ID!, authors: String, description: String!, image: String, link: String, title: String!}: User
        removeBook: {bookId: ID!}: User
    }
`;

module.exports = typeDefs;
