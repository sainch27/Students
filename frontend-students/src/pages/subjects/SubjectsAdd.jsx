import { json, useNavigate } from 'react-router-dom';
import PageContent from "../../components/pageContent";
import DefaultButton from "../../components/DefaultButton";

const SubjetctAdd = () => {
    const navigate = useNavigate();
    
  return (
    <>
      <PageContent pageTitle="Agregar Materias"
      actions={[<DefaultButton
      color="red"
      onClick={() => {
        navigate('/subjects');
      }}
      >Agregar</DefaultButton>]}>
        
      </PageContent>
    </>
  );
}

export default SubjetctAdd;