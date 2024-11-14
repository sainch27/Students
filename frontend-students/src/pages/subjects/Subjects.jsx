import { json, useNavigate } from 'react-router-dom';
import PageContent from "../../components/pageContent";
import DefaultButton from "../../components/DefaultButton";

const Subjetct = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageContent pageTitle="Materias"
      actions={[<DefaultButton
      color="darkturquoise"
      onClick={() => {
        navigate('/subjects/add');
      }}
      >Agregar</DefaultButton>]}>
        <table>
          <th>Nombre</th>
          <th>Año</th>
          <th>Profesor</th>
          <th>Aula</th>
          <th>Acciones</th>
        </table>
      </PageContent>
    </>
  );
}

export default Subjetct;