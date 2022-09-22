import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SelectMate from './components/SelectMate'

ReactDOM.render(
  <React.StrictMode>
  <SelectMate
   defaultText="Seleccioná una Opcion" defaultValue="1"
    options={
      [
        {
          value:1,
          label:'Opcion 1',
          selected: false
        },
        {
          value:2,
          label:'Opcion 2',
          selected: false
        },
      ]
    }
 / >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
