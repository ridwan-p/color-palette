import { ic_check, ic_close } from "assets"
import { useState } from "react"
import styles from "./ProgressBar.module.scss"

export const ProgressBar = () => {
  const [process, setProcess] = useState(100)
  return (
    <div className={styles.progressbar}>
      {process >= 100 ? <ProgressBarComplate /> : <ProgressBarStart percent={process} />}
    </div>
  )
}

const ProgressBarComplate = () => {
  return (
    <>
      <div className={styles['progressbar-container']}>
        <div className={styles['progressbar-title']}>Selesai ...</div>
      </div>
      <img src={ic_check} width={32} height={32} alt="complate" className={styles['progressbar-icon']} />
    </>
  )
}

type PropsStart = {
  percent: number
}
const ProgressBarStart: React.FC<PropsStart> = ({
  percent
}) => {
  return (
    <>
      <div className={styles['progressbar-container']}>
        <div className={styles['progressbar-title']}>Mengunggah ...</div>
        <div className={styles['progressbar-status']}>
          <div className={styles['progressbar-label-status']}>65% . 2 detik tersisa</div>
          <div className={styles['progressbar-item']}>
            <div className={styles['progressbar-item-process']} style={{ width: `${percent}%` }}></div>
          </div>
        </div>
      </div>
      <img src={ic_close} width={32} height={32} alt="close" className={styles['progressbar-icon']} />
    </>
  )
}