import { Routes as ReactRoutes, Route, BrowserRouter } from "react-router-dom"
import { HomeRoute } from "layouts"
import { About, ColorName, Home } from "views"

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<HomeRoute />} >
          <Route path="/" element={<Home />} />
          <Route path="/color-name" element={<ColorName />} />
          <Route path="/about" element={<About />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  )
}