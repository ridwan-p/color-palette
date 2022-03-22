import { FC } from 'react'
type Props = {

}


export const Navbar: FC<Props> = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          <img src="/logo.svg" alt="" width="30" height="24" />
          Logo
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Generator</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Colors</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          </form>
          <a className="nav-link" aria-current="page" href="#" style={{ whiteSpace: 'nowrap' }}><i className="bi bi-linkedin"></i> EN</a>
        </div>
      </div>
    </nav >
  )
}