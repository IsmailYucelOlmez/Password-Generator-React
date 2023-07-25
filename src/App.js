import { useState } from 'react';
import './App.css';
import Checkbox from './Checkbox';

function App() {

  const [password,setPassword]=useState({
    length:5,
    uppercase:false,
    lowercase:false,
    number:false,
    symbol:false
  });

  const[handleText,setHandleText]=useState("");

  const [showPopup,setShowPopup]=useState(false);
  const [errorType,setErrorType]=useState("");
  

  const changeUppercaseState=()=>{
     setPassword({
      ...password,
      uppercase: !password.uppercase
     })
  }

  const changeLowercaseState=()=>{
    setPassword({
     ...password,
     lowercase: !password.lowercase
    })
 }

 const changeNumberState=()=>{
    setPassword({
      ...password,
      number: !password.number
    })
  }

  const changeSymbolState=()=>{
    setPassword({
      ...password,
      symbol: !password.symbol
    })
  }

  const setPasswordLength=(value)=>{
    setPassword({
      ...password,
      length:value
    })
  }

  const showError=(type)=>{
    setShowPopup(!showPopup);
    setErrorType(type);

    setTimeout(() => {
      setShowPopup(!showPopup);
      setErrorType("");
    }, 3000);

  }

  const generatePassword=()=>{
    
    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );
    const numberArray=[0,1,2,3,4,5,6,7,8,9];
    const symbolArray=['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];;

    const {length,uppercase,lowercase,number,symbol}=password;

    const generateWord=(length,uppercase,lowercase,number,symbol)=>{

    const usableArray=[
       
        ...(uppercase ? upperCaseLetters:[]),
        ...(lowercase ? lowerCaseLetters:[]),
        ...(number ? numberArray:[]),
        ...(symbol ? symbolArray:[]),
       
    ]
    
    const shuffleArray=(array)=>array.sort(()=>Math.random()-0.5)
    
    if(usableArray.length==0){
      showError("unselectedfilter");

    }else{

    const actualPassword=shuffleArray(usableArray).slice(0,length);
    setHandleText(actualPassword?.join(""));
    
 
    return actualPassword;
  }
    }
  generateWord(length,uppercase,lowercase,number,symbol);
  
}


  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Generator</h1>
      </header>
      <div className='content'>

        <div className='input-field'>
          <input type='text' placeholder='Min 5 Character' readOnly value={handleText||""} onChange={(e)=>setHandleText(e.target.value)}></input>
          <button className='copy-btn' onClick={()=>{
            if(handleText==""){
              showError("notexttocopy");
            }else{            
              navigator.clipboard.writeText(handleText);
            }

          }}><i className="fa-solid fa-clipboard" ></i></button>
        </div>

        <div className='options-field'>

          <div className='filter-element'><label>Password Length</label><input value={password.length||""} onChange={(e)=>setPasswordLength(e.target.value)} type='number' min={5} /></div>
          <div className='filter-element'><label>Include Uppercase</label><Checkbox  value={password.uppercase} onChange={changeUppercaseState}/></div>
          <div className='filter-element'><label>Include Lowercase</label><Checkbox  value={password.lowercase} onChange={changeLowercaseState}/></div>
          <div className='filter-element'><label>Include Numbers</label><Checkbox  value={password.number} onChange={changeNumberState}/></div>
          <div className='filter-element'><label>Include Symbols</label><Checkbox  value={password.symbol} onChange={changeSymbolState}/></div>

          <button className='show-btn' onClick={generatePassword}>Create Password</button>
        </div>

      </div>

      {(showPopup && errorType=="unselectedfilter")&&
        <div className='popup-field'>
          <i className="fa-solid fa-xmark"></i>
          <p>You Must Choose at Least One</p>
        
        </div>
      }
      {(showPopup && errorType=="notexttocopy")&&
        <div className='popup-field'>
          <i className="fa-solid fa-xmark"></i>
          <p>No Text to Copy</p>
      
        </div>
      }

    </div>
  );
}

export default App;
