import React, { useEffect, lazy, Suspense } from 'react';


import Header from './components/header/header.component';
import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import {Switch, Route, Redirect} from 'react-router-dom';

import Spinner from './components/spinner/spinner.component';

import {GlobalStyle} from './global.styles';

import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));


const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);
 
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' 
            render={() => currentUser ? (
              <Redirect to='/'/>): (<SignInAndSignUpPage />) }  
            />
          </Suspense>
        </Switch>
      </div>
    );
  
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
