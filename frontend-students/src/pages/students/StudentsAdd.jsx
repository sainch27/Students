import { json, useNavigate } from 'react-router-dom'
import PageContent from '../../components/pageContent.jsx';
import DefaultButton from "../../components/DefaultButton.jsx";
import './studentsAdd.css'

const StudentsAdd = () => {
  const navigate = useNavigate();

  const addStudent = async () => {
    try {
      const body={
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        dni: Number(document.getElementById('dni').value),
        email: document.getElementById('email').value
      }
      const response = await fetch('/api/students',{
        method: 'POST',
        body: JSON.stringify(body)
      });
      const data = await response.json();

      if(data.message){
        alert(`${data.message}`);
        return;
      }

      alert('Alumno agregado');
      navigate('/students');
    }catch(e){
      console.error(e);
    }
  };

  const validateInputs = () => {
    let valid = true;
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const dni = document.getElementById("dni");
    const email = document.getElementById("email");

    const spanFirstname = document.getElementById("spanFirstname");
    const spanLastname = document.getElementById("spanLastname");
    const spanDni = document.getElementById("spanDni");
    const spanEmail = document.getElementById("spanEmail");

    const spanValidation = [
      {span: spanFirstname, validations:[
        {validation:firstname.validity.valueMissing, message:'Nombre requerido'}
      ]},
      {span: spanLastname, validations:[
        {validation:lastname.validity.valueMissing, message:'Apellido requerido'}
      ]},
      {span: spanDni, validations:[
        {validation:dni.validity.valueMissing, message:'DNI requerido'},
        {validation:dni.validity.rangeOverflow, message:'DNI inválido: superior a lo permitido'},
        {validation:dni.validity.rangeUnderflow, message:'DNI inválido: inferior a lo permitido'}
      ]},
      {span: spanEmail, validations:[
        {validation:email.validity.valueMissing, message:'Email requerido'},
        {validation:email.validity.patternMismatch, message:'Email inválido'}
      ]}
    ];

    for(let i = 0; i < spanValidation.length; i++){
      for(let j = 0; j < spanValidation[i].validations.length; j++){
        if(spanValidation[i].validations[j].validation){
          spanValidation[i].span.innerHTML = spanValidation[i].validations[j].message;
          valid = false;
          break;
        }else{
          spanValidation[i].span.innerHTML = "";
        }
      }
    }

    return valid;
  }

  return (
    <>
      <PageContent pageTitle="Agregar alumnos"
      actions={[
        <DefaultButton color="red"
          onClick={() => {
            navigate('/students');
          }}
        >Atrás</DefaultButton>
      ]}>
        <form className="formStudent" 
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if(validateInputs()){
            addStudent();
          }
        }}>
          <label for="name">Nombre:</label>
          <div className='divInput'>
            <input type="text" 
            placeholder="Nombre" 
            id="firstname"
            maxLength={100} 
            required/>
            <span id='spanFirstname'></span>
          </div>
          
          <label for="lastName">Apellido:</label>
          <div className='divInput'>
            <input type="text" 
            placeholder="Apellido" 
            id="lastname" 
            maxLength={100}
            required/>
            <span id='spanLastname'></span>
          </div>
          
          <label for="dni">DNI:</label>
          <div className='divInput'>
            <input type="number" 
            placeholder="DNI" 
            id="dni" 
            min={1}
            max={99999999}
            required/>
            <span id='spanDni'></span>
          </div>
          
          <label for="email">Email:</label>
          <div className='divInput'>
            <input type="email" 
            placeholder="ejemplo@correo.com" 
            id="email" 
            maxLength={100}
            pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
            required/>
            <span id='spanEmail'></span>
          </div>
          
          <DefaultButton color='darkturquoise'
          type='submit'
          >Agregar</DefaultButton>
        </form>
      </PageContent>
    </>
  );
}

export default StudentsAdd;