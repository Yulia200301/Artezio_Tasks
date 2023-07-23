import React from "react"
import logo from '../images/artezio-white-logo.svg'


export const Navbar = () => {
  return <nav className="navbar navbar-dark navbar-expand bg-artezio">
  <div className="container">
      <a className="navbar-brand" href="/">
          <img src={logo} alt height="55"/>
          <span className="logo-sub-office">Office</span>
      </a>
      <ul className="navbar-nav me-auto">
          <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/officePlan">Office Plan</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/employees">Employees</a>
          </li>
      </ul>
  </div>
</nav>
  
}
