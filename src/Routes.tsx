import { Routes as ReactRoutes, Route, BrowserRouter } from "react-router-dom"
import { Home } from "views"

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Home />} />
      </ReactRoutes>
    </BrowserRouter>
  )
}