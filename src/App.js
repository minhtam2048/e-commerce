import React, {Component} from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {SetCurrentUser} from './redux/user/user.actions';

import {Switch, Route, Redirect} from 'react-router-dom';


import './App.css';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {SetCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          SetCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      else {
        SetCurrentUser(userAuth);
      }
    });
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
          <Route exact path='/signin' 
            render={() => this.props.currentUser ? (
              <Redirect to='/'/>): (<SignInAndSignUpPage />) }  
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  SetCurrentUser: user => dispatch(SetCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);