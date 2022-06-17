import clsx from "clsx"
import React from "react"
import styles from "./ButtonIcon.module.scss"

type Props = {
    className?: string
    iconPre?: string
    children: React.ReactNode
    onClick(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
    style?: Object
}
export const ButtonIcon: React.FC<Props> = ({
    className,
    iconPre,
    children,
    onClick,
    style
}) => {

    return (
        <button
            className={clsx(
                styles['btn-icon'],
                'btn',
                className,
            )}
            onClick={onClick}
            style={style}
        >
            {!!iconPre && <img src={iconPre} className="btn-icon-img" alt="icon button" width={32} height={32} />}
            <div className={styles['btn-icon-content']}>{children}</div>
        </button>
    )
}