import React, { useEffect, useState } from "react"
import axios from 'axios'
import default_icon from '../images/default_icon.jpg'

export const AddEmployeePage = () => {

  const URL = process.env.REACT_APP_API_URL
  const regexPattern = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/2[0-9]{3}$/

  const [workspaces, setWorkspace] = useState([
    {
      number_space: 'Null',
      occupied: 'Null'
    }
  ])

  async function GetWorkspaces() {
    try {
      const res = axios.get(`${URL}/api/officePlan/free`)
      setWorkspace((await res).data)
    } catch (error) {
      console.log(error)
    }
  }

  const [name, setName] = useState(['Null'])
  // const [technology, setTechnology] = useState(['Null'])
  const [position, setPosition] = useState(['Null'])
  // const [workspace_num, setWorkspace_num] = useState(['Null'])
  const [employedAt, setEmployedAt] = useState(['Null'])
  const icon = default_icon

  useEffect(() => {
    let ignor = false
    if (!ignor) {
      GetWorkspaces()
    }
    return () => {
      ignor = true;
    }
  }, [])

  const updateFormValidity = () => {
    try {
      const isValid =
        name.replace(/^\s+|\s+$/g, '') !== '' &&
        position.replace(/^\s+|\s+$/g, '') !== '' &&
        regexPattern.test(employedAt)
      const btnSubmit = document.getElementById('btnSubmit')
      if (isValid) {
        btnSubmit.removeAttribute('disabled')
      }
      else {
        btnSubmit.setAttribute('disabled', 'true')
      }
    } catch (error) {
      console.log(error)
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

  function HandleBlur(e) {
    try {
      const warning = document.getElementById('warning')
      if (!regexPattern.test(e.target.value)) {
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

  // TODO отправка формы
  async function HandleSubmit(e) {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('technology', document.getElementById('selectTech').value)
      formData.append('position', position)
      formData.append('workspace_num', document.getElementById('selectWork').value)
      formData.append('employedAt', employedAt)

      const inputFile = document.getElementById('formFile').files[0]
      if(inputFile){
        formData.append('imgURL', inputFile)
      }

      const res = await axios.post(`${URL}/api/employee/add`, formData)
      if(res.data.message){
        alert(res.data.message +'\n' + res.data.error)
      }
      else {
        const id = res.data.id
        window.location.replace(`/info?id=${id}`)
      }
    } catch(error) {
      console.log(error)
    }
  }


  return <div className="container mt-3">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item"><a href="/employees">Employees</a></li>
        <li className="breadcrumb-item active" aria-current="page">New</li>
      </ol>
    </nav>
    <form onSubmit={HandleSubmit}>
      <div className="row ">
        <div className="col-4">
          <img src={icon} id="outImage" class="image img-thumbnail" alt="Photo Employee" />
          <div>
            <label for="formFile" class="mt-2 mb-2 fs-5 form-label">Upload avatar picture</label>
            <input accept="image/png, image/jpg, image/jpeg" onBlur={updateFormValidity} onChange={HandleImage} class="form-control" id="formFile" type="file" />
          </div>
        </div>
        <div className="col-8">
          <div className="d-flex justify-content-end">
            <a href="/employees" type="button" className="btn btn-outline-dark me-1">Cancel</a>
            <button className="btn btn-primary" disabled id="btnSubmit" type="submit">Save</button>
          </div>
          <div className="row mt-4">
            <div className="col-2">
              <p className="form-label fs-5">Name</p>
            </div>
            <div className="col-10">
              <input required type="text" onBlur={updateFormValidity} onChange={e => setName(e.target.value)} className="form-control" maxlength="200" />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">
              <p className="form-label fs-5">Technology</p>
            </div>
            <div className="col-10">
              <select onBlur={updateFormValidity} required class="form-select" id="selectTech">
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
              <input required type="text" onBlur={updateFormValidity} onChange={e => setPosition(e.target.value)} className="form-control" maxlength="100" />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">
              <p className="form-label fs-5">Workspace</p>
            </div>
            <div className="col-2">
            <select onBlur={updateFormValidity} required id="selectWork" class="form-select">
                {
                  workspaces.map((workspace) =>
                    <option selected value={workspace.number_space} key={workspace.number_space}>{workspace.number_space}</option>)
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
              <input required type="text" onBlur={HandleBlur} onChange={e => setEmployedAt(e.target.value)} className="form-control" placeholder="ММ/ДД/ГГГГ"/>
              <p id="warning" className="d-none text-danger">Дата не соответствует формату ММ/ДД/ГГГГ</p>
            </div>
          </div>
        </div>
      </div>
    </form>

  </div>

}
