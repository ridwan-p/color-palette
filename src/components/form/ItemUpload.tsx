import { useRef } from 'react'
import { ic_change, ic_close, ic_file } from 'assets'
import styles from './ItemUpload.module.scss'

type Props = {
    filename: string
    onChange(file: File): void
    onRemove(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}
export const ItemUpload: React.FC<Props> = ({
    filename,
    onChange,
    onRemove
}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const files = e.target.files
        if (files?.[0]) {
            onChange(files[0])
        }
    }

    const handleClickChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    return (
        <div className={styles['item-upload']}>
            <div className={styles['item-upload-content']}>
                <img src={ic_file} alt="change" width={32} height={32} />
                <div className={styles['item-upload-filename']}>{filename}</div>
            </div>
            <div className={styles['item-upload-action']}>
                <input
                    type="file"
                    id='file-image-upload'
                    accept='image/*'
                    className='d-none'
                    onChange={handleOnChange}
                    ref={inputRef}
                />
                <button className="btn btn-link p-0" onClick={handleClickChange}>
                    <img src={ic_change} alt="change" width={32} height={32} />
                </button>
                <button className="btn btn-link p-0" onClick={onRemove}>
                    <img src={ic_close} alt="close" width={32} height={32} />
                </button>
            </div>
        </div>
    )
}