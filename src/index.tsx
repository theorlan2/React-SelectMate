import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SelectMate from "./components/SelectMate";

ReactDOM.render(
  <React.StrictMode>
    <div className="container-example">
      <SelectMate
        defaultText="Seleccioná una Opcion"
        defaultValue="3"
        options={[
          {
            value: 1,
            label: "Opion 1",
          },
          {
            value: 2,
            label: "Opion 2",
          },
          {
            value: 3,
            label: "Opion 5",
          },
          {
            value: 4,
            label: "Option 4",
          },
          {
            value: 5,
            label: "Option 5",
          },
          {
            value: 6,
            label: "Option 6",
          },
        ]}
      />
    </div>
  </React.StrictMode>,
  document.getElementById("root"),
);
