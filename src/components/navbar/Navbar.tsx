import { ic_language, logo } from 'assets'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.scss"
type Props = {
}


export const Navbar: FC<Props> = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" className='me-2' width="18" height="18" />
          Palet Warna
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Beranda</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/color-name">Nama Warna</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">Tentang</NavLink>
            </li>
            <li className="nav-item">
              <button className='btn btn-link nav-link'> <img src={ic_language} alt="language" height={18} width={16} /> ID</button>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  )
}