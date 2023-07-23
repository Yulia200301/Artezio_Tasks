import { Layout } from "./components/Layout.jsx";
import { Routes, Route} from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {InfoEmployeePage} from './pages/InfoEmployeePage'
import {OfficePlanPage} from './pages/OfficePlanPage'
import {EmployeesPage} from './pages/EmployeesPage'
import {EditEmployeePage} from './pages/EditEmployeePage'
import {AddEmployeePage} from './pages/AddEmployeePage'


function App() {
  return (
   <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="officePlan/:room?/:workNum?" element={<OfficePlanPage/>}/>
        <Route path="add" element={<AddEmployeePage/>}/>
        <Route path="edit/:id?" element={<EditEmployeePage/>}/>
        <Route path="info/:id?" element={<InfoEmployeePage/>}/>
        <Route path="employees" element={<EmployeesPage/>}/>
      </Routes>
    </Layout>
  )
}

export default App;
