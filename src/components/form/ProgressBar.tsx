import { ic_check, ic_close } from "assets"
import { useEffect, useState } from "react"
import styles from "./ProgressBar.module.scss"

export enum Status {
  Idle,
  Loading,
  Finish
}

type Props = {
  status: Status
}

export const ProgressBar: React.FC<Props> = ({
  status
}) => {

  const [percent, setPercent] = useState(0)

  useEffect(() => {
    console.log('status', status)
    console.log('percent', percent)
    if (status === Status.Loading && percent < 99) {
      setTimeout(() => {
        setPercent(percent + 1)
      }, 100)
    }

    if (status === Status.Finish) setPercent(100)

  }, [status, percent])

  return (
    <div className={styles.progressbar}>
      {percent >= 100 ? <ProgressBarComplate /> : <ProgressBarStart percent={percent} />}
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
          <div className={styles['progressbar-label-status']}>{percent}% . {Math.floor(120 / 100 * (100 - percent))} detik tersisa</div>
          <div className={styles['progressbar-item']}>
            <div className={styles['progressbar-item-process']} style={{ width: `${percent}%` }}></div>
          </div>
        </div>
      </div>
      <img src={ic_close} width={32} height={32} alt="close" className={styles['progressbar-icon']} />
    </>
  )
}