import { NavLink } from 'react-router-dom';
import './navItem.css'

const NavItem = ({routeItem, nameItem}) => {
    return (
      <>
        <NavLink
        to={routeItem}
          className={ ({isActive}) => isActive ? "navBar__activeItem" : "" }
        >
          {nameItem}
        </NavLink>
      </>
    );
  }
  
  export default NavItem;