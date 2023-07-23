import React, {useEffect, useState, useRef} from "react"
import axios from 'axios'
import default_icon from '../images/default_icon.jpg'
import { GetCurrentDate } from '../components/CurrentDate.js'

export const EditEmployeePage = () => {

  const URL = process.env.REACT_APP_API_URL
  const regexPattern = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/2[0-9]{3}$/
  const selectRef = useRef(null)
  
  async function GetWorkspaces(){
    try{
      const res = axios.get(`${URL}/api/officePlan/free`)
      setWorkspace((await res).data)
    } catch (error) {
      console.log(error)
    }
  }

  const [workspaces, setWorkspace] = useState([
    {
      number_space: 'Null',
      occupied: 'Null'
    }
  ])

  const [name, setName] = useState(['Null'])
  const [name_def, setName_def] = useState(['Null'])
  const [technology, setTechnology] = useState(['Null'])
  const [position, setPosition] = useState(['Null'])
  const [workspace_num, setWorkspace_num] = useState(['Null'])
  const [workspace_num_def, setWorkspace_num_def] = useState(['Null'])
  const [icon, setIcon] = useState([default_icon])

  var tech =''
  var date = ''
  const [employedAt, setEmployedAt] = useState(['Null'])

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')

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
      setName_def((await res).data.name)

      setTechnology((await res).data.technology)
      tech= (await res).data.technology
      LoadSelectTech()
      setPosition((await res).data.position)
      setWorkspace_num((await res).data.workspace_num)
      setWorkspace_num_def((await res).data.workspace_num)

      date = (await res).data.employedAt
      var currentDate = GetCurrentDate(date)
      const result  = (currentDate[3]) + '/' + (currentDate[1]) + '/' + (currentDate[2])
      setEmployedAt(result)

    } catch(error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    let ignor = false
    if(!ignor){
      GetWorkspaces()
      GetInfo()
      GetIcon()
    }
    return ()=>{
      ignor=true;
    }
  },[])

  const updateFormValidity = () => {
    try {
      const isValid =
      name.replace(/^\s+|\s+$/g, '') !=='' &&
      position.replace(/^\s+|\s+$/g, '') !== '' &&
      regexPattern.test(employedAt)
    const btnSubmit = document.getElementById('btnSubmit')
    if(isValid){
      btnSubmit.removeAttribute('disabled')
    }
    else {
      btnSubmit.setAttribute('disabled', 'true')
    }
    } catch (error) {
      console.log(error)
    }
  }

  function LoadSelectTech(){
    const select = document.getElementById('selectTechnology')
    for(const  option of select.options){
      if(option.value == tech){
         option.setAttribute('selected', true)
      }
    }
  }

  function HandleImage(e) {
    try {
      const myFile = (document.getElementById('formFile'));
      const myImage = (document.getElementById('outImage'));
      var reader = new FileReader();
      reader.onload = function (e) {
        myImage.setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(myFile.files[0]);
    } catch (error) {
      console.log(error)
    }
  }

  function HandleBlur(e){
    try {
      const warning = document.getElementById('warning')
    if(!regexPattern.test(e.target.value)){
      warning.classList.remove('d-none')
    }
    else {
      warning.classList.add('d-none')
      setEmployedAt(e.target.value)
    }
    updateFormValidity()
    } catch (error) {
      console.log(error)
    }
  }

  async function HandleSubmit(e){
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('technology', technology)
      formData.append('position', position)
      formData.append('workspace_num', workspace_num)
      formData.append('employedAt', employedAt)

      const inputFile = document.getElementById('formFile').files[0]
      if(inputFile){
        formData.append('imgURL', inputFile)
      }

      const res = await axios.put(`${URL}/api/employee/edit/:id?`, formData, {
        params: {
          id: id
        }
      })
      if(res.data.message){
        alert(res.data.message + '\n' + res.error)
      }
      else{
        window.location.replace(`/info?id=${id}`)
      }
    } catch (error) {
      alert('Произошла ошибка' + error)
    }
  }


  return <div className="container mt-3">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li className="breadcrumb-item"><a href="/">Home</a></li>
      <li className="breadcrumb-item"><a href="/employees">Employees</a></li>
      <li className="breadcrumb-item"><a href={'/info?id='+ id}>{name_def}</a></li>
      <li className="breadcrumb-item active" aria-current="page">Edit</li>
    </ol>
  </nav>
  <form onSubmit={HandleSubmit}>
  <div className="row">
    <div className="col-4">
      <img id="outImage" src={icon} class="image img-thumbnail" alt="Photo Employee" />
      <div>
        <label for="formFile" class="mt-2 mb-2 fs-5 form-label">Upload avatar picture</label>
        <input accept="image/png, image/jpg, image/jpeg" class="form-control" onBlur={updateFormValidity} onChange={HandleImage} id="formFile" type="file" />
      </div>
    </div>
    <div className="col-8">
        <div className="d-flex justify-content-end">
          <a href={'/info?id='+ id} className="btn btn-outline-dark me-1">Cancel</a>
          <button className="btn btn-primary" id="btnSubmit" disabled type="submit">Save</button>
        </div>
        <div className="row mt-4">
          <div className="col-2">
            <p className="form-label fs-5">Name</p>
          </div>
          <div className="col-10">
            <input required type="text" value={name} onBlur={updateFormValidity} onChange={e => setName(e.target.value)} className="form-control" maxlength="200"/>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-2">
            <p className="form-label fs-5">Technology</p>
          </div>
          <div className="col-10">
            <select onBlur={updateFormValidity} ref={selectRef} id="selectTechnology" onChange={e => setTechnology(e.target.value)} class="form-select" >
              <option value='Java'>Java</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='.NET'>.NET</option>
              <option value='QA'>QA</option>
            </select>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-2">
            <p className="form-label fs-5">Position</p>
          </div>
          <div className="col-10">
            <input required type="text" value={position} onBlur={updateFormValidity} onChange={e => setPosition(e.target.value)} className="form-control" maxlength="100" />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-2">
            <p className="form-label fs-5">Workspace</p>
          </div>
            <div className="col-2">
              <select id="selectWork" onBlur={updateFormValidity} onChange={e => setWorkspace_num(e.target.value)} class="form-select">
                <option value={workspace_num_def} selected>{workspace_num_def}</option>
                {
                  workspaces.map((workspace) =>
                    <option value={workspace.number_space} key={workspace.number_space}>{workspace.number_space}</option>)
                }
              </select>
            </div>
          <div className="col-4">
            <a className="fs-5" href="/officePlan">&lt;Choose on the plan&gt;</a>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-2">
            <p className="form-label fs-5">Employed</p>
          </div>
          <div className="col-10">
            <input required type="text" placeholder="ММ/ДД/ГГГГ" value={employedAt} onBlur={HandleBlur} onChange={e => setEmployedAt(e.target.value)} className="form-control" />
            <p id="warning" className="d-none text-danger">Дата не соответствует формату ММ/ДД/ГГГГ</p>
          </div>
        </div>
    </div> 
  </div>
  </form>
</div>
}