import { illustration } from "assets"
import clsx from "clsx"
import { Footer, Navbar } from "components"
import styles from "./Home.module.scss"

export const About = () => {
  return (
    <div className={styles['home-container']}>
      <Navbar />
      <div className={clsx(
        'container',
        styles['home-content']
      )}>
        <h4 className="text-center fw-bold text-info mt-5" style={{ marginBottom: '92px' }}>Tentang Aplikasi Palet Warna</h4>
        <div className="row">
          <div className="col-lg-5">
            <img src={illustration} alt="illustraiton" width={514} height={356.6} className="img-fluid" />
          </div>
          <div className="col-lg-7" style={{ textAlign: 'justify' }}>Palet warna adalah aplikasi untuk menentukan warna yang dominan dari gambar yang telah ada. Dengan adanya warna tersebut diharapkan dapat mempermudah dalam bidang disain grafis, fotografi atau pun seni rupa. Penentuan warna dalam aplikasi ini menggunakan metode pengelompokan warna dengan algoritma data mining K-means.</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}