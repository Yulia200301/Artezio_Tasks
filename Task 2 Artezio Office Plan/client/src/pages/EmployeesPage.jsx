import React, {useEffect, useState} from "react"
import axios from 'axios'

export const EmployeesPage = () => {

  const URL = process.env.REACT_APP_API_URL
  const [employees, setEmployess] = useState([
    {
      id: "Null",
      name: "Null",
      technology: "Null",
      workspace_num: "Null"
    }
  ])

  async function GetEmployees(){
    try{
      const res = axios.get(`${URL}/api/employee`)
      setEmployess((await res).data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    let ignor = false
    if(!ignor){
      GetEmployees()
    }
    return ()=>{
      ignor=true;
    }
  },[])

  function HandleFilterInput(){
    const filterValue = document.getElementById('filter-input').value.toLowerCase()
    const rows = document.querySelectorAll('#data-table tbody tr')

    rows.forEach((row) => {
      const technologyCell = row.querySelector('td:nth-child(3)')
      const nameCell = row.querySelector('td:nth-child(2)')
      const technology = technologyCell.textContent.toLowerCase()
      const name = nameCell.textContent.toLowerCase()

      if (technology.includes(filterValue) || name.includes(filterValue)) {
        row.style.display = ''
      } else {
        row.style.display = 'none'
      }
    })
  }

  return <main className="mt-3">
    <div className="container">
      <div className="row">
        <div className="col-lg-10">
          <div className="input-group mb-3">
            <input id="filter-input" type="text" className="form-control" placeholder="Filter by name or technology..." />
            <button onClick={HandleFilterInput} className="btn btn-outline-secondary" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="col-2">
          <a className="btn btn-success" href="/add">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 1 18 16">
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
            </svg>
            <span> New Employee</span>
          </a>
        </div>
      </div>
      <table id="data-table" className="table table-hover table-fixed">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Technology</th>
            <th scope="col">Workspace</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((employee)=>
              <tr key={employee.id}>
                <th scope="row">{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.technology}</td>
                <td>{employee.workspace_num}</td>
                <td><a href={'/info?id='+employee.id}>More</a></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>

  </main>
}