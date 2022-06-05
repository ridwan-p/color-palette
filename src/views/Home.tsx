import { ic_upload } from "assets"
import clsx from "clsx"
import {
  ButtonIcon,
  FileUpload,
  Footer,
  ImagePalette,
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
      <ButtonIcon
        iconPre={ic_upload}
        onClick={() => { }}
        className='btn-primary'
        style={{ minWidth: '262px' }}
      >
        Unggah Gambar
      </ButtonIcon>
      <div className="w-100">
        <ImagePalette
          src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
        />
      </div>
    </div>
  )
}
