import { ic_check } from "assets"
import { minuteAndSecond } from "helpers/time"
import { useEffect, useState } from "react"
import styles from "./ProgressBar.module.scss"

export enum Status {
  Idle,
  Loading,
  Finish
}

type Props = {
  status: Status,
  onFinish(): void
}

export const ProgressBar: React.FC<Props> = ({
  status,
  onFinish }) => {

  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (status === Status.Loading && percent < 99) {
      setTimeout(() => {
        setPercent(percent + 3)
      }, 100)
    }

    if (status === Status.Finish) {
      setPercent(100)
      onFinish()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const second = Math.floor(120 / 100 * (100 - percent))
  return (
    <>
      <div className={styles['progressbar-container']}>
        <div className={styles['progressbar-title']}>Prosess ...</div>
        <div className={styles['progressbar-status']}>
          <div className={styles['progressbar-label-status']}>{percent}% . {minuteAndSecond(second)} menit tersisa</div>
          <div className={styles['progressbar-item']}>
            <div className={styles['progressbar-item-process']} style={{ width: `${percent}%` }}></div>
          </div>
        </div>
      </div>
      {/* <img src={ic_close} width={32} height={32} alt="close" className={styles['progressbar-icon']} /> */}
    </>
  )
}