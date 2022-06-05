import { Routes as ReactRoutes, Route, BrowserRouter } from "react-router-dom"
import { About, Home } from "views"

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </ReactRoutes>
    </BrowserRouter>
  )
}