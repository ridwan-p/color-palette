import { Routes as ReactRoutes, Route, BrowserRouter } from "react-router-dom"
import { HomeRoute } from "layouts"
import { About, Home } from "views"

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<HomeRoute />} >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  )
}