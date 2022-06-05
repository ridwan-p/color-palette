import clsx from "clsx"
import React from "react"
import sytles from "./ButtonIcon.module.scss"

type Props = {
    className?: string
    iconPre?: string
    children: string
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
                'btn',
                className,
                sytles['btn-icon']
            )}
            onClick={onClick}
            style={style}
        >
            {!!iconPre && <img src={iconPre} className="btn-icon-img" alt="icon button" width={32} height={32} />}
            <div className={sytles['btn-icon-content']}>{children}</div>
        </button>
    )
}