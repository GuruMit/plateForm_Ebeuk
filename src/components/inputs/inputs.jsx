import React from "react";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import {Typeahead}  from 'react-bootstrap-typeahead';


// Css class
import 'react-bootstrap-typeahead/css/Typeahead.css';
// Custom css





 export const Input1 = () => {
  
  const [singleSelections, setSingleSelections] = useState([]);
  
  return (
    <>
     
     <Form.Group>
        <Typeahead
        id="2"
          labelKey="name"
          onChange={setSingleSelections}
          options={option1}
          placeholder="Votre secteur ? ..."
          selected={singleSelections}
          />
      </Form.Group>
    </>
  );
};




 
export const Input2 = () => {
  
  const [singleSelections, setSingleSelections] = useState([]);
  
  return (
    <>
     
     <Form.Group>
        <Typeahead
        id="1"
          labelKey="name"
          onChange={setSingleSelections}
          options={option2}
          placeholder="Region..."
          selected={singleSelections}
          />
      </Form.Group>
    </>
  );
};



var option1 = [
  {id: 1, name: 'Akon'},
  {id: 2, name: 'Ngolguet'},
  {id: 3, name: 'Biyem-Assi'},
  {id: 4, name: 'Melen'},
];

var option2 = [
  {id: 1, name: 'Sagmelima'},
  {id: 2, name: 'Yaooundé'},
  {id: 3, name: 'Douala'},
  {id: 4, name: 'Mbalmayo'},
];