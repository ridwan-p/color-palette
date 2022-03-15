import './App.css';
import { CardPalette, Navbar } from './components';

const colors = [
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
  ['#DAB88B', '#F3E9DD', '#FDF6EC', '#B7CADB'],
]

function App() {
  return <>
    <div className="bg-black">
      <div className="container pb-3">
        <Navbar />
        <div className="row">
          {
            colors.map((item, key) => (
              <div className="col-lg-3 p-2" key={key}>
                <CardPalette colors={item} />
              </div>

            ))
          }
        </div>
        <div className="d-flex justify-content-center py-3">
          <button className="btn btn-primary text-brown-3">Show More</button>
        </div>
      </div>
    </div>
    <div className="bg-brown-3 text-green">
      <div className="container">
        <div className='py-3'>
          <h5>What is Lorem Ipsum?</h5>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div className='py-3'>
          <h5>What is Lorem Ipsum?</h5>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
      </div>
    </div>

    <div className="bg-green text-brown-2">
      <div className="container py-3">
        <div className="row">
          <div className="col-lg-6">
            <h5>LOGO</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
          </div>
          <div className="col-lg-6">
            <ul className='nav justify-content-end'>
              <li className="nav-item">
                <a href="#" className="nav-link"><i className="bi bi-facebook"></i></a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link"><i className="bi bi-github"></i></a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link"><i className="bi bi-instagram"></i></a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link"><i className="bi bi-linkedin"></i></a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link"><i className="bi bi-twitter"></i></a>
              </li>
            </ul>
          </div>
          <hr />
          <div className="d-flex justify-content-center">
            © 2022 Ridwan Pamungkas. All rights reserved.
          </div>
        </div>
      </div>
    </div>

  </>
}

export default App;
