import clsx from "clsx"
import { Footer, Navbar } from "components"
import { Outlet } from "react-router-dom"
import styles from "./HomeLayout.module.scss"

type Props = {
  children: React.ReactNode
}

export const HomeLayout: React.FC<Props> = ({
  children
}) => {
  return (
    <div className={styles['home-layout-container']}>
      <Navbar />
      <div className={clsx(
        'container',
        styles['home-layout-content']
      )}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export const HomeRoute: React.FC = () => {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  )
}