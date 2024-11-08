import { json, useNavigate } from 'react-router-dom'
import PageContent from "../../components/PageContent.jsx";
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
        email: document.getElementById('lastname').value
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
    }catch(e){
      console.error(e);
    }finally{
      navigate('/students');
    }
  };

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
        onSubmit={(e) => {
          e.preventDefault();
          addStudent();
        }}>
          <label for="name">Nombre:</label>
          <input type="text" placeholder="Nombre" id="firstname" required/>
          <label for="lastName">Apellido:</label>
          <input type="text" placeholder="Apellido" id="lastname" required/>
          <label for="dni">DNI:</label>
          <input type="number" placeholder="DNI" id="dni" required/>
          <label for="email">Email:</label>
          <input type="email" placeholder="ejemplo@correo.com" id="email" required/>
          <DefaultButton color='darkturquoise'
          type='submit'
          // onClick={(e) => {
          //   e.preventDefault();
          //   addStudent();
          // }}
          >Agregar</DefaultButton>
        </form>
      </PageContent>
    </>
  );
}

export default StudentsAdd;