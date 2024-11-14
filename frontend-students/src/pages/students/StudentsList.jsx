import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import PageContent from '../../components/pageContent.jsx';
import DefaultButton from '../../components/DefaultButton.jsx';
import './studentsList.css'

const Students = () => {
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [deletingStudents, setDeletingStudents] = useState(false);

  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);


  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchStudent, setSearchStudent] = useState("");

  const [pages,setPages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents(searchStudent,pageNumber,pageSize);
  },[]);


  const fetchStudents = async (searchStudent, pageNumber, pageSize) => {
    try {
      setFetchingStudents(true);
      const response = await fetch(`/api/students/${searchStudent}/${pageNumber}/${pageSize}`,{
        method: 'GET',
      });
      const data = await response.json();
      setStudents(data.rows);
      setTotalStudents(data.count);

      const numberPages = [];
      for(let i = 0 ; i < Math.ceil(data.count / pageSize) ; i++){
        numberPages.push(i);
      }
      setPages(numberPages);
    }catch(e){
      console.error(e);
    }finally{
      setFetchingStudents(false);
    }
  };

  const deleteStudent = async (id) => {
    try{
      setDeletingStudents(true);
      const response = await fetch(`/api/students/${id}`,{
        method: 'DELETE',
      });
      const data = await response.json();
      alert(`${data.message}`);
    }catch(e){
      console.error(e);
    }finally{
      setDeletingStudents(false);
      setPageNumber(1);
      fetchStudents(searchStudent,1,pageSize);
    }
  }

  return (
    <>
      <PageContent pageTitle='Alumnos'
      actions={[
        <DefaultButton color='darkturquoise'
        routeNavigate='/students/add'
        onClick={() => {
          navigate('/students/add');
        }}
        >Agregar</DefaultButton>
      ]}>
        <div>
          <input className="search" type="text" placeholder="Buscar por Nombre o Apellido"/>
          <DefaultButton color='darkturquoise'
          onClick={() => {
            const search = document.getElementsByClassName("search")[0].value;
            setSearchStudent(search);
            setPageNumber(1);
            fetchStudents(search,1,pageSize);
          }}>Buscar</DefaultButton>
        </div>
        {
          fetchingStudents
          ? <p>Recuperando información</p>
          :<>
            {
              !students.length && <p>No hay datos disponibles</p>
            }
            <table className='tableComponent'>
              <thead>
                <tr>
                  <th>Legajo</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  students.map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.firstname}</td>
                      <td>{student.lastname}</td>
                      <td>
                      <DefaultButton
                      color='darkturquoise'
                      >Materias</DefaultButton>
                        <DefaultButton color='red'
                        onClick={() => {
                          const confimation = confirm(`Eliminar estudiante de id ${student.id}?`);
                          if(confimation) {
                            deleteStudent(student.id);
                          }
                        }}>
                          Borrar
                        </DefaultButton>
                        
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {
              students.length > 0 && 
              <div className='pagesDiv'>
                <label htmlFor="">
                  Total: {totalStudents}
                </label>
                <label className="optionsLabel">
                  Ítems por página:
                  <select name="numberRows" className="numberRows" 
                  
                  onChange={() => {
                    const page = document.getElementsByTagName('select')[0].value;
                    setPageSize(page);
                    setPageNumber(1);
                    fetchStudents(searchStudent,1,page);
                  }}
                  defaultValue={pageSize}
                  >
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </label>
                <div className='numberPages'>
                  {
                    pages.map((_,index) => (
                      <DefaultButton 
                      key={index}
                      color={ pageNumber===(index+1) ? 'gray' : 'darkturquoise'}
                      disabled={ pageNumber===(index+1) ? true : false}
                      onClick={() => {
                        setPageNumber(index+1);
                        fetchStudents(searchStudent,index+1,pageSize);
                      }}
                      >
                        {index+1}
                      </DefaultButton>
                    ))
                  }
                </div>
              </div>
            }
          </>
        }
        
        
      </PageContent>
    </>
  );
}

export default Students;