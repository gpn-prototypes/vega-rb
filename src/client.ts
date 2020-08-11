import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_BACKEND_API}/graphql`,
    cache: new InMemoryCache(),
})

export default client
