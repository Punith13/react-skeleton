import React , { Component } from 'react'; 
import { Field , reduxForm} from 'redux-form';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import { createPost } from '../actions';

//{...fields.input} { // this give many properties such as onChange , onFocus , onBlur }

// field.meta.error reads from the error object 

class PostsNew extends Component {
    
    renderField(field){
        
        // complete destructuring -> meta = field.meta ; 
        // touched = field.meta.touched 
        // error = field.meta.error 
        
     const { meta : { touched , error } } = field; 
    
     const className = `form-group ${ touched &&  error ? 'has-danger' : ''}`;
        
        return(
            <div className = {className}>
                <label>{field.label}</label>
                <input className="form-control"
                 type="text"   
                 {...field.input} 
                 /> 
                <div className="text-help">
                    { touched ?  error : ''}
                </div>
                
            </div>
        );
    }
    
    onSubmit(values){
        // this === > our component 
        
        //programmatic navigation 
        
        this.props.createPost(values , () => {
            
            // call back 
             this.props.history.push('/'); 
        });
        
    }
    
    render(){
        
        const { handleSubmit } = this.props; 
        
        return(
            
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                /> 
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">
                      Cancel
                </Link>
            </form>

        );
        
    }

}

function validate(values){
    
    // console.log(values); -> { title : 'asdf' , categories : 'asdf' , content : 'asdf'}; 
    
    const errors = {}; 
    
    // validate the inputs from 'values 
    
    if(!values.title || values.title.length < 3){
        
        errors.title = "Enter a title that is atleast 3 characters!"; 
    }
    
    if(!values.categories){
        errors.categories = "Enter some categories"; 
    }
    
    if(!values.content){
        errors.content = "Enter some content"; 
    }
    

    //if errors is empty the form is fine to submit 
    // if errors has *any* properties , redux form assumes form is invalid 
    
    return errors; 
    
}

// reduxForm is similar to connect 
export default reduxForm({
    
    validate, 
    // form here is the name="form" PostsNewForm is an unique  
    
    form : 'PostsNewForm'
    
})(
    // stack up connect components 
    
    // now createPost is available in this.props
   connect(null, { createPost })(PostsNew)


); 