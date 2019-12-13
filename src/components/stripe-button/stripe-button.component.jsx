import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
    console.log(token);
    alert('Payment successful');
}

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_ASGb5qcqYXV8iLWOHY8SAIWI00WP53HNdd';
    
    return(
        <StripeCheckout 
        label='Pay now'
        name= 'My testing website Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is ${price}`}
        amount={priceForStripe}
        panelLabel='Pay now'
        token={onToken}
        stripeKey={publishableKey}/>
    );
};

export default StripeCheckoutButton;