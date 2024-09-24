
import './App.css';
import { useEffect, useState } from 'react';
import languageData from "./Language.json";

function App() {
  const [input, setinput] = useState("")
  const [translatedText, settranslatedText] = useState("")
  const [language, setlanguage] = useState("hi")
  

  const translate = async() =>{
    var myHeaders = new Headers();
    myHeaders.append("apikey", "L1RiQ9YumTj746oQYhQ1hWNvQDbc1gOm");

    var raw = input;
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: raw
    };
    

    input !== "" && fetch(`https://api.apilayer.com/language_translation/translate?target=${language}`, requestOptions)
      .then(response => response.json()) 
      .then(result => {
        settranslatedText(result.translations[0].translation)
      })
      .catch(error => console.log('error', error));
  }
  
  return (
    <>

      <div className='container'>
        <h1>React.js Translator</h1>
        <div className='select'>
          
          <select onChange={(e)=>{
            setlanguage(e.target.value)
          }}>
            {
              Object.entries(languageData).map(([key,value])=>{
                return (
                  key == "hi" ? <option key={key} value={key} selected>{value.name}</option> :<option key={key} value={key}>{value.name}</option>)
              })
            }
          </select>
        </div>
        <div className='input'>
          <textarea onChange={(e)=>{
            setinput(e.target.value)
          }} cols={29} rows={12} placeholder='Start Writing' value={input}/>
          <textarea cols={29} rows={12} value={translatedText}/>
        </div>
        <button onClick={()=>{
          translate()
        }} className='translateBtn'>Translate</button>
      </div>
    </>
  );
}

export default App;
