import React, {Component} from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import {Switch, Route, Redirect} from 'react-router-dom';

import './App.css';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
        
    //     userRef.onSnapshot(snapshot => {
    //       SetCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data()
    //       });
    //     });
    //   }
    //   else {
    //     SetCurrentUser(userAuth);
    //     // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
    //   }
    // });
  }

componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' 
            render={() => this.props.currentUser ? (
              <Redirect to='/'/>): (<SignInAndSignUpPage />) }  
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
});



export default connect(mapStateToProps)(App);
