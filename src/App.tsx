import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SelectMate } from './components/SelectMate';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <div className='container'>
            <div className="cont_select_center">
                <SelectMate defaultText="Seleccioná una Opcion" defaultValue="1"  >
                    <option value="1" >Opcion 1</option>
                    <option value="2" >Opcion 2</option>
                </SelectMate>

                <div className="divisor" >
                    <SelectMate defaultText="" defaultValue="2"   >
                        <option value="" >Seleccioná otra Opcion</option>
                        <option value="a" >Opcion a</option>
                        <option value="b" >Opcion b</option>
                    </SelectMate>
                </div>
            </div>
        </div> 

    </div>
  );
}

export default App;
