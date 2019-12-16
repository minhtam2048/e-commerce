import React from 'react';
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/amazon.svg';
import {auth} from '../../firebase/firebase.utils';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selector'
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles';

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
            <strong>amajon</strong>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink  to='/shop'>SHOP</OptionLink>
            <OptionLink  to='/shop'>CONTACT</OptionLink>
            {
                currentUser ?
                (<OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>)
                :
                (<OptionLink className='option' to='/signin'>SIGN IN</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown /> }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})


export default connect(mapStateToProps)(Header);