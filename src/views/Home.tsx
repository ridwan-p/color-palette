import {
  FileUpload,
  Navbar,
  ProgressBar
} from "components"

import styles from "./Home.module.scss"

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
    <div className={styles['empty-value']}>
      <FileUpload onChange={(file) => { console.log('file', file) }} />
      <ProgressBar />
    </div>
  )
}
