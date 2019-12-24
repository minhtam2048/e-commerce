import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { useState } from 'react';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''});
    const {email, password} = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();

        emailSignInStart(email, password);
    };
    
    const handleChange = (event) => {
        const {value, name} = event.target;
        setUserCredentials({...userCredentials, [name]: value })
    };

    
        return(
            <div className='sign-in'>
                <h2>I already have account</h2>
                <span>I already have email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput 
                        name="email" 
                        type="email" 
                        value={email} 
                        handleChange={handleChange} 
                        label="email" required
                        autoComplete = 'new-password' 
                    />
                    <FormInput 
                        name="password" 
                        type="password" 
                        value={password} 
                        handleChange={handleChange} 
                        label="password" required 
                        autoComplete = 'new-password'
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);