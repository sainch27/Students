import NavItem from '../../../components/NavItem.jsx'
import './moduleOption.css'

const ModuleOption = (options) => {
    return (
        <div className='moduleOption'>
            <NavItem {...options}/>
        </div>
    );
}

export default ModuleOption;