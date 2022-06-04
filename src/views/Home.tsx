import { FileUpload, Navbar } from "components"

import "./Home.scss"

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <EmptyValue />
      </div>
    </>
  )
}

const EmptyValue = () => {

  return (
    <div className="empty-value">
      <FileUpload onChange={(file) => { console.log('file', file) }} />
    </div>
  )
}
