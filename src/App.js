import './App.css';
import React, {useState} from 'react';
const fetch = require('node-fetch');


function App() {
  const [input, setInput] = useState('');

async function submitFun(evt){
    if(evt.key === "Enter"){

      const response = await fetch(`https://demo-server-ds.herokuapp.com/getWeather`, {
        method: 'POST',

        body: JSON.stringify({
          location: input
        }),

        headers: {
          "Content-type":  "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
           
        }
      })

      const data = await response.json()

      let clear = document.getElementById('2ndroot');

      if(!document.getElementById('h_attribute')){
        let h = document.createElement('h1');
        h.setAttribute('id', 'h_attribute')
        h.innerHTML = "Temperature for " + data.location['name'] + "-->" + data.current['temp_c'] + "C";
        clear.appendChild(h);
      }
      else{
        let h = document.getElementById('h_attribute');
        h.innerHTML = "Temperature for " + data.location['name'] + " --> " + data.current['temp_c'] + "C";
      }
    }
  }


  return (
    <div className="App">
      <h1>Find Your Temperature</h1>
      <label htmlFor="">Location</label>&nbsp;
      <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyPress={submitFun}/>
      <div id='2ndroot'></div>
    </div>
  );
}

// `http://api.weatherapi.com/v1/current.json?key=1766ce4c296c4fc3b48174314222408&q=${input}`

export default App;
