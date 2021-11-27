// IMPORT React, Router, Apollo
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// IMPORT provider from react-redux
import { Provider } from 'react-redux';
// IMPORT store from utils
import store from './utils/store';

// IMPORT Pages
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
// Removed Store Provider, USE PROVIDER from react-redux
// import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

// CREATE HTTP Link
const httpLink = createHttpLink({
  uri: '/graphql',
});

// AUTH TOKEN
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// APOLLO CLIENT
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// APP RENDER
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* USE PROVIDER from REACT-REDUX instead of STORE PROVIDER */}
          {/* <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} />
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider> */}
          <Provider store={store}>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} />
              <Route component={NoMatch} />
            </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

// EXPORT APP
export default App;
