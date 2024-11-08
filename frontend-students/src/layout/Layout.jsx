import {Outlet, NavLink} from 'react-router-dom';
import NavItem from '../components/NavItem.jsx'
import './layout.css'

const App = () => {
  return (
    <>
      <div className='layout-root'>
        <aside className='navBar'>
        <h2>
          Trabajo Práctico 2
        </h2>
          <ul>
            <li>
              <NavItem routeItem='/' nameItem='Principal'/>
            </li>
              
            <li>
                <NavItem routeItem='/students' nameItem='Alumnos'/>
            </li>
          </ul>
        </aside>
          
        <main className='mainContent'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
