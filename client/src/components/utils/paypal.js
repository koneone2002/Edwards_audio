import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {



  render() {
    const onSuccess = (payment) =>{
        //console.log(JSON.stringify(payment))
        this.props.onSuccess(payment)
    }

    const onCancel = (data) =>{
      console.log(JSON.stringify(data))
    }

    const onError = (err) => {
      console.log(JSON.stringify(err))
    }

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox:'AZyZf0MwVMIlqU5qY5FJw44ozg1RsB9jh7XlHZns57yp_Eddgt9XzcNeWxpQ_2HON2HZo1FEEt1KdBdg',
      production: ''
    }

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size:'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    );
  }
}

export default Paypal;