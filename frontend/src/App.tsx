import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CountryPage } from './pages/Country'
import { HomePage } from './pages/Home'
import { PageLayout } from './components/Layout'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
  credentials: 'same-origin',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route Component={PageLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="/countries/:code" Component={CountryPage} />
            <Route path="*" Component={() => <Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
