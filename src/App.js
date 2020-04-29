import React,{useState} from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import './App.css';
import NumberFormat from 'react-number-format';

function App() {
  
  const[state,setState] = useState({
    phoneNumber: '',
    fullNameError: '',
    email:'',
    phoneNumberError: '',
    password1Error: '',
    password2Error:'',
    emailError:'',
    
});

const[passwordState,setPasswordState] = useState({
  password: '',
  });

  const[confirmPasswordState,setConfirmPasswordState] = useState({
  confirmPassword:'',
  });
  
  const[cardNumber, setCardNumber] = useState('')
  const[fullName, setName] = useState('')
  const[expiryDate, setExpiry] = useState('')
  const[cardPin, setCardPin] = useState('')
  const[focus, setFocus] = useState('')
    
  const enabled = fullName.length > 0 && passwordState.password.length > 0 && cardPin.length > 0;
  
  let isError = false;
  const errors = {};
   //function to validate name
  function validateName(){
    if(fullName.length <= 2){
      isError = true;
      errors.fullNameError = "Full Name must be at least 2 characters long";
      if(isError){
        setState({
          ...state,
          ...errors})
    }
   }}
//function to validate PhoneNumber
   function validatePhoneNumber(){
    
      if(state.phoneNumber.match(/^(080|081|070|091|090)/)){
        isError = false;
        console.log("we good!");
      }else{
        isError = true;
        errors.phoneNumberError = " Phone-Number must start with either 080,081,070,091,090"
        
      }
      
    }
    //input format 
    function limit(val, max) {
      if (val.length === 1 && val[0] > max[0]) {
        val = '0' + val;
      }
     
      if (val.length === 2) {
        if (Number(val) === 0) {
          val = '01';
     
        //this can happen when user paste number
      } else if (val > max) {
          val = max;
        }
      }
     
      return val;
    }
     
    function cardExpiry(val) {
      let month = limit(val.substring(0, 2), '12');
      let year = val.substring(2, 4);
     
      return month + (year.length ? '/' + year : '');
    }
  //function to validate email
    function validateEmail() {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if (reg.test(state.email) === false) {
    isError = true;
    errors.emailError = "Enter valid Email";
     }
     else {
    isError = false;
  }
  if(isError){
    setState({
      ...state,
      ...errors})
}
    }
 
//function to validatepassword
   function validatePassword(){
      const password1 = passwordState.password;
      const password2 = confirmPasswordState.confirmPassword;
    if (!password1) {
      isError = true;
      errors.password1Error = 'This field cannot be empty.'
    }
    //  check length
else if (password1.length < 6) {
    isError = true;
       errors.password1Error = 'The password provided is not long enough.'
        }
  // Check for capital letters
  
  else if (!/([A-Z]+)/g.test(password1)) {
    isError = true;
       errors.password1Error = 'Must Contain at least 1 UpperCase letter'
      }
  // check for at least a number
  else if (!/(.*[0-9].*)/g.test(password1)) {
    isError = true;
    errors.password1Error = 'Must Have a Number'
    }
//check for at least 1 special chararcter
   else if (!/[^\w]/g.test(password1)) {
      isError = true;
      errors.password1Error = 'Must Have a Special Character'
      }
    
      //if passwords are equal
if (!password2) {
  isError = true;
      errors.password2Error = 'This field must have a value';
      }else if (password2 !== password1 ) {
        isError = true;
        errors.password2Error = 'Passwords have to match'; 
           }
           if(isError){
            setState({
              ...state,
              ...errors})
        }
  
  }
  

  
//Main validate function that invokes other validate functions
 function validate()  {
    validateName();
    validatePassword();
    validateEmail();
    validatePhoneNumber();
    
      
      if(isError){
        setState({
          ...state,
          ...errors})
    }
    return isError;
     };

     function onSubmit(e){
      e.preventDefault();
      console.log(passwordState.password, confirmPasswordState.confirmPassword)
      //this.props.onSubmit(this.state)
      const err = validate();
      
      if(!err){
        console.log("Submitted");
        alert("WELCOM TO SOFTOM");
        
         }};

     function maxLengthCheck(object) {
      if (object.target.value.length > object.target.maxLength) {
       object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
      }
 
 
  
  return (
      <div id="wrapper">
        <div>
            <div>
               <Cards number={cardNumber}
               name={fullName} 
               expiry={expiryDate}
               cvc={cardPin}
               focused={focus}
                 />
            </div>
            
            
                <div id ="form-wrapper">
                <form>
                <label >Full Name:
                 <input type="text" 
                    name='fullName' 
                    placeholder='Your Full Name' 
                    value={fullName} 
                    onChange={e => setName(e.target.value)} 
                    onInput={validateName}
                    onFocus={e => setFocus(e.target.fullName)} />
                    <div className="error">{state.fullNameError}</div>
                    <br/> 
                    </label>


                    <label >Email:
                    <input type="email" 
                    name='email' 
                    placeholder='Your email' 
                    value={state.email} 
                    onInput={validateEmail}
                    onChange={e => setState({email: e.target.value})}
                    />
                    <div className="error">{state.emailError}</div>
                    <br/>
                    </label> 
                    
                    <label >Phone Number:
                    <input type="text" 
                    name='phoneNumber' 
                    placeholder='Your Phone Number'
                    maxLength='11' 
                    onInput={maxLengthCheck} 
                    value={state.phoneNumber} 
                    onChange={e => setState({phoneNumber: e.target.value})}/>
                    <div className="error">{state.phoneNumberError}</div>
                    <br/> 
                    </label>

                    <label >Password:
                    <input type="password" 
                    name="password" 
                    placeholder='Enter password' 
                    value={state.password} 
                    onInput={validatePassword}
                    onChange={e => setPasswordState({password: e.target.value})}/>
                    <div className="error">{state.password1Error}</div>
                    <br/> 
                    </label>

                    <label >Confirm Password:
                    <input 
                    name="confirmPassword"
                    type="password"  
                    placeholder='Confirm password' 
                    value={state.confirmPassword} 
                    onInput={validatePassword}
                    onChange={e => setConfirmPasswordState({confirmPassword: e.target.value})}/>
                    <div className="error">{state.password2Error}</div>
                    <br/> 
                    </label>

                    <label >Card Number:
                    <NumberFormat  
                    format="#### #### #### ####"
                    name='cardNumber' 
                    placeholder='Card Number'
                    value={cardNumber} 
                    onChange={e => setCardNumber(e.target.value)} 
                    
                    onFocus={e => setFocus(e.target.fullName)} />
                    <div></div>
                    <br/> 
                    </label>  
                    
                    <div>
                    <label >Expiry Date:
                    <NumberFormat 
                     format={cardExpiry}
                    name='expiryDate' 
                    placeholder='MM/YY Expiry' 
                    value={expiryDate} 
                    onChange={e => setExpiry(e.target.value)} 
                    onFocus={e => setFocus(e.target.fullName)} />
                    <div></div>
                    <br/>  
                    </label>

                    <label >CVC:
                    <input type="number" 
                    name='cardPin' 
                    placeholder='CVC' 
                    maxLength='4'
                    onInput={maxLengthCheck}
                    value={cardPin} 
                    onChange={e => setCardPin(e.target.value)} 
                    onFocus={e => setFocus(e.target.fullName)} />
                    <div></div>
                    <br/>  
                    </label> 
                    </div>
                    
                    <button  type="button" disabled={!enabled} onClick={e=> onSubmit(e)}>Submit</button>
                     
                    
                    
                    
                    

                </form>
            </div>
            
            </div>
          
        
        
        
      </div>
      
    );
  }
   
  

  
  

export default App;
