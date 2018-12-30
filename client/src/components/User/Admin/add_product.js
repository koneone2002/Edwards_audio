import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';

import FormField from '../../utils/Forms/formfield';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../utils/Forms/formActions';
import Fileupload from '../../utils/Forms/fileupload';

import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/products_actions';
 
class AddProduct extends Component {

  state = {
    formError:false,
    formSuccess:false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter your discription'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter your price'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product Brand',
          name: 'brands_input',
          options:[]
          
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available, in stock',
          name: 'available_input',
          options:[
            {key:true, value:'Yes'},
            {key:false, value:'No'}
          ]      
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shippings_input',
          options:[
            {key:true, value:'Yes'},
            {key:false, value:'No'}
          ]      
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config:{
            label: 'Wood material',
            name: 'wood_input',
            options:[]
        },
        validation:{
            required: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
    },
  
      watts: {
        element: 'select',
        value: '',
        config: {
          label: 'Watts',
          name: 'watts_input',
          options:[
            {key:200, value:200},
            {key:250, value:250},
            {key:300, value:300},
            {key:350, value:350},
            {key:400, value:400}
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options:[
            {key:true, value:'Public'},
            {key:false, value:'Hidden'}
          ]      
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      images: {
        value:[],
        validation:{
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showlabel: false
      }

      }
      

    }

    
  
updateFields = (newFormData) => {
  this.setState({
    formdata: newFormData
  })
}
updateForm = (element) => {
  const newFormdata = update(element,this.state.formdata,'products');
  this.setState({
    formError: false,
    formdata: newFormdata,

  })
}
resetFieldHandler = () => {
  const newFormData = resetFields(this.state.formdata, 'products')
  this.setState({
    formdata: newFormData,
    formSuccess: true
  });
  setTimeout(()=>{
      this.setState({

        formSuccess: false
      },()=>{
        this.props.dispatch(clearProduct())
      })
   
  },3000)
}

submitForm = (event) =>{
  event.preventDefault();

  let dataToSubmit = generateData(this.state.formdata, 'products');
  let formIsValid = isFormValid(this.state.formdata,'products');
  if(formIsValid) {
     //console.log(dataToSubmit);
     this.props.dispatch(addProduct(dataToSubmit)).then(()=>{
       if( this.props.products.addProduct.success){
          this.resetFieldHandler();

       } else{
          this.setState({formError:true})
       }
     })
    
  } else {
    this.setState({
      formError: true
    })
  }
 

}


componentDidMount() {
  const formdata = this.state.formdata;

  this.props.dispatch(getBrands()).then(response => {
    //console.log(this.props.products.brands);
    const newFormData = populateOptionFields(formdata,this.props.products.brands,'brand');
    this.updateFields(newFormData)
  })
  this.props.dispatch(getWoods()).then(response => {
    //console.log(this.props.products.brands);
    const newFormData = populateOptionFields(formdata,this.props.products.woods,'wood');
    this.updateFields(newFormData)
  })
}
imagesHandler = (images) => {
    const newFormData = {
      ...this.state.formdata
    }

    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
      formdata: newFormData
    })
}


  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>
          <form onSubmit={(event)=> this.submitForm(event)}>

            <Fileupload
              imagesHandler={(images)=> this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />

          <FormField
            id={'name'}
            formdata={this.state.formdata.name}
            change={(element)=> this.updateForm(element)}
          />
          <FormField
            id={'description'}
            formdata={this.state.formdata.description}
            change={(element)=> this.updateForm(element)}
          />
          <FormField
            id={'price'}
            formdata={this.state.formdata.price}
            change={(element)=> this.updateForm(element)}
          />
          <div className="form_devider"></div>

          <FormField
            id={'brand'}
            formdata={this.state.formdata.brand}
            change={(element)=> this.updateForm(element)}
          />
          <FormField
            id={'shipping'}
            formdata={this.state.formdata.shipping}
            change={(element)=> this.updateForm(element)}
          />
          <FormField
            id={'available'}
            formdata={this.state.formdata.available}
            change={(element)=> this.updateForm(element)}
          />
          <div className="form_devider"></div>

          <FormField
            id={'wood'}
            formdata={this.state.formdata.wood}
            change={(element)=> this.updateForm(element)}
          /> 
          <FormField
            id={'watts'}
            formdata={this.state.formdata.watts}
            change={(element)=> this.updateForm(element)}
          />
          <div className="form_devider"></div>
          <FormField
            id={'publish'}
            formdata={this.state.formdata.publish}
            change={(element)=> this.updateForm(element)}
          />
          {this.state.formSuccess ?
            <div className="form_success">
              Success    
            </div>

          :null}

          {this.state.formError ?
            <div className="error_label">
              Please check your data
            </div>
            :null} 
          <button onClick={(event)=> this.submitForm(event)}>
            Add Product
          </button>
          </form>
        </div>

      </UserLayout>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
  
};


export default connect(mapStateToProps)(AddProduct);