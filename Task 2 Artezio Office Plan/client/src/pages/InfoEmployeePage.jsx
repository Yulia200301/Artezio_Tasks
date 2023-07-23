import React, {useEffect, useState} from "react"
import axios from 'axios'
import default_icon from '../images/default_icon.jpg'
import { GetCurrentDate } from '../components/CurrentDate.js'

export const InfoEmployeePage = () => {

  const URL = process.env.REACT_APP_API_URL

  const [room, setRoom] = useState([1])
  const [workNum, setWorkNum] = useState([1])

  const [name, setName] = useState(['Null'])
  const [technology, setTechnology] = useState(['Null'])
  const [position, setPosition] = useState(['Null'])
  const [workspace_num, setWorkspace_num] = useState(['Null'])
  const [icon, setIcon] = useState([default_icon])

  var date = ''
  const [employedAt, setEmployedAt] = useState(['Null'])

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  async function GetIcon(){
    try {
      const res = axios.get(`${URL}/api/employee/info/:id?`, {
        params: {
          "id": id
        }})
      const imName = (await res).data.imgURL
      if(imName){
        setIcon(`${URL}/${imName}`)
      }
    }  catch (error) {
      console.log(error)
    }
  }

  async function GetInfo(){
    try{
      const res = axios.get(`${URL}/api/employee/info/:id?`, {
        params: {
          "id": id
        }})
      setName((await res).data.name)
      setTechnology((await res).data.technology)
      setPosition((await res).data.position)
      setWorkspace_num((await res).data.workspace_num)

      setWorkNum((await res).data.workspace_num)

      date = (await res).data.employedAt
      var currentDate = GetCurrentDate(date)
      const result  = (currentDate[0]) + ' ' + (currentDate[1]) + ', ' + (currentDate[2])
      setEmployedAt(result)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    let ignor = false
    if(!ignor){
      GetInfo()
      GetIcon()
    }
    return ()=>{
      ignor=true;
    }
  },[])

  function GetRoomWork(){
    try{
      for (let i = 1;i<100 ;i++){
      if(workNum  < (16*i)){
        setRoom(i)
        break
      }
    }
    } catch (error){
      console.log(error)
    }
  }

  return <div className="container mt-3">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item"><a href="/employees">Employees</a></li>
        <li className="breadcrumb-item active" aria-current="page">{name}</li>
      </ol>
    </nav>
    <div className="row fs-5">
      <div className="col-4">
        <p className="mb-1 text-center fs-3 fw-bold">{name}</p>
        <img onLoad={GetRoomWork} src={icon} class="image img-thumbnail" alt="..." />
      </div>
      <div className="col-8">
        <div className="d-flex justify-content-end">
          <a className="btn btn-outline-secondary" href={'/edit?id='+id}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="1 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
            <span> Edit</span>
          </a>
        </div>
        <div className="row mt-1">
          <div className="col-3">
            <p className=" text-end fw-bold">Technology</p>
          </div>
          <div className="col-3">
            <p className=" text-start">{technology}</p>
          </div>
        </div>
        <div className="row mt-1 mb-1">
          <div className="col-3">
            <p className=" text-end fw-bold">Position</p>
          </div>
          <div className="col-3">
            <p className=" text-start">{position}</p>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col-3">
            <p className=" text-end fw-bold">Workspace</p>
          </div>
          <div className="col-5 d-flex flex-row">
            <p>#</p>
            <p id="workNum">{workspace_num}</p>
            {/* href={'/:workspace_num?='+employee.workspace_num} */}
            <a className="ms-1" href={'/officePlan/?room='+ room + '&workNum='+ workspace_num}>&lt;Show on the plan&gt;</a>
          </div>
        </div>
        <div className="row mt-1 mb-1">
          <div className="col-3">
            <p className=" text-end fw-bold">Employed since</p>
          </div>
          <div className="col-3 d-flex flex-row">
            <p>{employedAt}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
}