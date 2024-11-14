import PageContent from '../../components/pageContent.jsx';
import ModuleOption from './components/moduleOption.jsx';
import './mainPage.css'

const MainPage = () => {
  return (
    <>
      <PageContent pageTitle='Página Principal'>
          <ModuleOption nameItem='Alumnos' routeItem='/students'/>
          <ModuleOption nameItem='Materias' routeItem='/subjects'/>
      </PageContent>
    </>
  );
}

export default MainPage;