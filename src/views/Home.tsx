import clsx from "clsx"
import {
  FileUpload,
  Footer,
  ItemUpload,
  Navbar,
  ProgressBar
} from "components"

import styles from "./Home.module.scss"

export const Home = () => {
  return (
    <div className={styles['home-container']}>
      <Navbar />
      <div className={clsx(
        'container',
        styles['home-content']
      )}>
        <EmptyValue />
      </div>
      <Footer />
    </div>
  )
}

const EmptyValue = () => {

  return (
    <div className={styles['empty-value']}>
      <FileUpload onChange={(file) => { console.log('file', file) }} />
      <ProgressBar />
      <ItemUpload
        filename="pantai.png"
        onChange={(file) => { console.log('file', file) }}
        onRemove={() => { console.log('remove file') }}
      />
    </div>
  )
}
