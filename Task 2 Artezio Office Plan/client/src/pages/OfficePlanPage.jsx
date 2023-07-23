import React, {useEffect, useState} from "react"
import axios from 'axios'
import '../office-plan.css'
import default_icon from '../images/default_icon.jpg'

export const OfficePlanPage = () => {
  
  const URL = process.env.REACT_APP_API_URL

  const [employees, setEmployess] = useState([
    {
      id: "Null",
      name: "Null",
      technology: "Null",
      position: "Null",
      workspace_num: "Null",
      imgURL: default_icon
    }
  ])

  var icon= default_icon
  var  allPath, allTextPath, num_space, count_workspace

  const [workspaces, setWorkspaces] = useState([
    {
      number_space: 'Null',
      occupied: false
    }
  ])

  // проверка на наличие параметра
  var flag = false
  var room, workNum
  if (window.location.href.includes('?')) {
    try {
      flag = true
      const searchParams = new URLSearchParams(window.location.search);
      room = searchParams.get('room')
      workNum = searchParams.get('workNum')

    } catch (error) {
      console.log(error)
    }
  }
  else{
    room = 1
  }

  async function GetWorkspaces(){
    try{
      const res = axios.get(`${URL}/api/officePlan/all`)
      setWorkspaces((await res).data)
    } catch (error) {
      console.log(error)
    }
  }

  async function GetInfo(){
    try{
      const res = axios.get(`${URL}/api/employee`)
      setEmployess((await res).data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    let ignor = false
    if(!ignor){
      GetWorkspaces()
      GetInfo()
    }
    return ()=>{
      ignor=true;
    }
  },[])

  function Init(){
    try{
      // общее кол-во мест
      num_space = workspaces.length
      // max кол-во мест на картинке
      count_workspace = 16
      // получние элементов svg
      allPath = document.querySelectorAll('.workspace')
      allTextPath = document.getElementsByTagName('text')
      // общее кол-во мест > 16
      if(num_space>count_workspace){ // room > 1
        if((count_workspace * room) >= num_space){ // room - last
          LastRoom()
          // оставшиеся кол-во мест в последней комнате
          const count_ = num_space - count_workspace * (room-1) 
          InitWorkspace(count_, 16*(room-1))
        }
        else{ // room = 1
          if(room == 1){
            FirstRoom()
          }
          else { // roon = n
            OtherRoom()
          }
          InitWorkspace(count_workspace, 16*(room-1))
        }
      } // room = 1
      else if(num_space <= count_workspace){
        OneRoom()
        InitWorkspace(num_space, 0)
      }
      if(flag){
        flag = false
        const num_path = (workNum - 16*(room-1))-1
        const pathNum = allPath[num_path]
        Active(pathNum)
      }
    } catch(error) {
      console.log(error)
    }
  }

  function OneRoom(){
    document.querySelector('.room-switch-1').classList.add('d-none')
    document.querySelector('.room-switch-2').classList.add('d-none')
    document.getElementById('room').innerHTML = room

  }
  
  function FirstRoom(){
    document.querySelector('.room-switch-1').classList.add('d-none')
    document.querySelector('.room-switch-2').classList.remove('d-none')
    document.getElementById('room').innerHTML = room
  }

  function LastRoom(){
    document.querySelector('.room-switch-1').classList.remove('d-none')
    document.querySelector('.room-switch-2').classList.add('d-none')
    document.getElementById('room').innerHTML = room
  }

  function OtherRoom(){
    document.querySelector('.room-switch-1').classList.remove('d-none')
    document.querySelector('.room-switch-2').classList.remove('d-none')
    document.getElementById('room').innerHTML = room
  }

  function HandleActive(event){
    const pathNum = event.target
    Active(pathNum)
  }

  async function Active(pathNum){
    try {
      document.querySelector('.workspace-info').classList.add('d-none')
      document.querySelector('.workspace-empty').classList.add('d-none')

      for( const path of allPath){
        path.classList.remove('active')
      }
      pathNum.classList.add('active')
      const valueAttribute = pathNum.getAttribute('value')
      var workspace_number
      // получение номера рабочего места
      for (const text of allTextPath) {
        const textValue = text.getAttribute('data-value');
        if (textValue == valueAttribute) {
          workspace_number = text.textContent
          break
        }
      }
      if (workspaces[workspace_number - 1].occupied) {
        const info = document.querySelector('.workspace-info')
        info.classList.remove('d-none')
        document.querySelector('.workspace-info__number-1').innerHTML = workspace_number
        for( const emp of employees){
          if(emp.workspace_num == workspace_number){
            document.getElementById('nameEmp').innerHTML = emp.name
            document.getElementById('technologyEmp').innerHTML = emp.technology
            document.getElementById('positionEmp').innerHTML = emp.position
            const imName = emp.imgURL
            if (imName) {
              document.getElementById('imgEmp').src = `${URL}/${imName}`
            }
            else{
              document.getElementById('imgEmp').src = default_icon
            }
            document.getElementById('refEmp').href = `/info?id=${emp.id}`
            break
          }
        }
      }
      else {
        const info = document.querySelector('.workspace-empty')
        info.classList.remove('d-none')
        document.querySelector('.workspace-info__number-2').innerHTML = workspace_number
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  

  function InitWorkspace(count_workspace, num_space){
    try{
      for (let i = 0; i < count_workspace; i++) {
        
        allPath[i].classList.remove('d-none')
        allTextPath[i].classList.remove('d-none')
        allTextPath[i].textContent = (i + 1 + num_space)
        allPath[i].addEventListener('click', HandleActive)
        if (workspaces[i +num_space].occupied) {
          allPath[i].classList.add('occupied')
        }
      }
    } catch(error){
      console.log(error)
    }
  }

  function ClearSVG(){
    try{
      for (let i = 0; i < 16; i++){
        allPath[i].classList.add('d-none')
        allTextPath[i].classList.add('d-none')
        allPath[i].removeEventListener('click', HandleActive)
        allPath[i].classList.remove('active')
        allPath[i].classList.remove('occupied')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  function ClickBack(){
    try{
      ClearSVG()
      room = Number(room)
      room -=1
      if(room == 1){
        FirstRoom()
      }
      else {
        OtherRoom()
      }
      InitWorkspace(count_workspace,16*(room-1))
    } catch(error){
      console.log(error)
    }
  }

  function ClickNext() {
    try {
      ClearSVG()
      room = Number(room)
      room +=1
      if ((count_workspace * room) >= num_space) { // room - last
        LastRoom()
        // оставшиеся кол-во мест в последней комнате
        const count__ = num_space - count_workspace * (room - 1)
        InitWorkspace(count__, 16 * (room - 1))
      }
      else {   // roon = n
        OtherRoom()
        InitWorkspace(count_workspace, 16 * (room - 1))
      }
    } catch (error) {
      console.log(error)
    }
  }

  Init()

  return <main class="mt-3 container">
  <div class="office-plan">
      <svg class="room-plan room1-plan" height="600px" width="500px">
          {/* <!-- Границы комнаты  --> */}
          <line stroke="black" stroke-width="2" x1="50" x2="400" y1="45" y2="45"/>
          <line stroke="black" stroke-width="2" x1="399" x2="399" y1="45" y2="30"/>

          <line stroke="black" stroke-width="2" x1="50" x2="50" y1="30" y2="560"/>
          <line stroke="black" stroke-width="2" x1="50" x2="400" y1="545" y2="545"/>

          <line stroke="black" stroke-width="2" x1="480" x2="480" y1="30" y2="560"/>

          {/* <!-- Двери --> */}
          <rect fill="white" height="30" stroke="black" width="4" x="476" y="60"/>
          <rect fill="white" height="30" stroke="black" width="4" x="476" y="220"/>
          <rect fill="white" height="30" stroke="black" width="4" x="476" y="475"/>


          {/* <!-- Колонны --> */}
          <rect fill="black" height="10" width="10" x="50" y="40"/>
          <rect fill="black" height="10" width="10" x="390" y="40"/>

          <rect fill="black" height="10" width="10" x="50" y="275"/>
          <rect fill="black" height="10" width="10" x="390" y="275"/>

          <rect fill="black" height="10" width="10" x="50" y="540"/>
          <rect fill="black" height="10" width="10" x="390" y="540"/>

          {/* <!--
           - Рабочие места:
           --> */}

          {/* <!-- 1 - 4  --> */}
          <path value="1" class="d-none workspace"
                d="m 150 150
             v -80
             h -24

             q 0 56 -56 56
             v 24
             h 81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="1" className="d-none" x="125" y="140"></text>

          <path value="2" class="workspace d-none"
                d="m 150 150
             v -80
             h 24

             q 0 56 56 56
             v 24
             h -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="2" className="d-none" x="165" y="140"></text>

          <path value="3" class=" d-none workspace"
                d="m 310 150
             v -80
             h -24

             q 0 56 -56 56
             v 24
             h 81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="3" className="d-none" x="285" y="140"></text>

          <path value="4" class="d-none workspace"
                d="m 310 150
             v -80
             h 24

             q 0 56 56 56
             v 24
             h -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="4" className="d-none" x="325" y="140"></text>

          {/* <!-- 5 - 8 --> */}
          <path value="5" class="d-none workspace"
                d="m 150 150
             l -80 0
             l 0 24

             q 56 0 56 56
             h 24
             v -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="5" className="d-none" x="125" y="170"></text>

          <path value="6" class="d-none workspace"
                d="m 150 150
             l 80 0
             l 0 24

             q -56 0 -56 56
             h -24
             v -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="6" className="d-none" x="165" y="170"></text>

          <path value="7" class="d-none workspace"
                d="m 310 150
             l -80 0
             l 0 24

             q 56 0 56 56
             h 24
             v -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="7" className="d-none" x="285" y="170"></text>

          <path value="8" class="d-none workspace"
                d="m 310 150
             l 80 0
             l 0 24

             q -56 0 -56 56
             h -24
             v -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="8" className="d-none" x="325" y="170"></text>


          {/* <!-- Нижняя половина комнаты: --> */}
          {/* <!-- 9 - 12  --> */}
          <path value="9" class="d-none workspace"
                d="m 150 420
             v -80
             h -24

             q 0 56 -56 56
             v 24
             h 81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="9" className="d-none" x="125" y="410"></text>

          <path value="10" class="d-none workspace"
                d="m 150 420
             v -80
             h 24

             q 0 56 56 56
             v 24
             h -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="10" className="d-none" x="160" y="410"></text>

          <path value="11" class="d-none workspace" d="m 310 420
         v -80
         h -24

         q 0 56 -56 56
         v 24
         h 81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="11" className="d-none" x="280" y="410"></text>

          <path value="12" class="d-none workspace"
                d="m 310 420
             v -80
             h 24

             q 0 56 56 56
             v 24
             h -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="12" className="d-none" x="320" y="410"></text>

          {/* <!-- 13 - 16 --> */}
          <path value="13" class="d-none workspace"
                d="m 150 420
             l -80 0
             l 0 24

             q 56 0 56 56
             h 24
             v -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="13" className="d-none" x="120" y="440"></text>

          <path value="14" class="d-none workspace"
                d="m 150 420
             l 80 0
             l 0 24

             q -56 0 -56 56
             h -24
             v -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="14" className="d-none" x="160" y="440"></text>

          <path value="15" class="d-none workspace"
                d="m 310 420
             l -80 0
             l 0 24

             q 56 0 56 56
             h 24
             v -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="15" className="d-none" x="280" y="440"></text>

          <path value="16" class="d-none workspace"
                d="m 310 420
             l 80 0
             l 0 24

             q -56 0 -56 56
             h -24
             v -81"
                data-workspace
                fill="transparent" stroke="black" stroke-width="2"/>
          <text data-value="16" className="d-none" x="320" y="440"></text>
      </svg>

      <div class="room-switcher">
          <button class="to-bottom-room room-switch-1" onClick={ClickBack} title="To the back room">
              <i class="bi-chevron-compact-up"></i>
          </button>
          <div class="current-room">
              Room <span id="room"></span>
          </div>
          <button class="to-bottom-room room-switch-2" onClick={ClickNext}  title="To the next room">
              <i class="bi-chevron-compact-down"></i>
          </button>
      </div>

      {/* <!-- Блок с информацией о выбранном рабочем месте. --> */}
      <div class="workspace-info d-none w-50">
        <h2 class="workspace-info__title">Workspace #<span class="workspace-info__number-1"></span></h2>
        <div className="row mt-3">
          <div className="col-5  d-flex flex-column justify-content-center ">
            <h3 id="nameEmp" className="text-center"></h3>
            <img id="imgEmp" className="img-thumbnail" src={icon}></img>
          </div>
          <div className=" fs-5 text col mt-5">
            <div class="row">
              <div class="col fw-bold text-end ">Technology</div>
              <div id="technologyEmp" class="col text-start"></div>
            </div>
            <div class="row mt-2">
              <div class="col fw-bold text-end ">Position</div>
              <div id="positionEmp" class="col text-start"></div>
            </div>
            <div class="row mt-2">
              <a id="refEmp" href="#" class="col ps-4 ms-5 pe-0 text-center">More</a>
            </div>
          </div>
        </div>

      </div>

      {/* <!-- Блок с сообщением, что выбранное рабочее место не занято. --> */}
      <div class="workspace-empty d-none">
          <h2 class="workspace-info__title">Workspace #<span class="workspace-info__number-2"></span> unoccupied</h2>
      </div>
  </div>
  <script src="./scripts/office-plan.js"></script>
</main>
}