import React from "react"
import { Routes as ReactRoutes, Route, BrowserRouter } from "react-router-dom"
import { Demo, Home } from "./views"

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="demo" element={<Demo />} />
      </ReactRoutes>
    </BrowserRouter>
  )
}