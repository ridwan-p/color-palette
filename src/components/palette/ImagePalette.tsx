import { Palette } from "./Palette"
import styles from './ImagePalette.module.scss'
import clsx from "clsx"

type Props = {
    src: string
}

export const ImagePalette: React.FC<Props> = ({
    src
}) => {
    const colors = ['#5A6E71', '#8A928D', '#C1B79E', '#5EA2DE', '#A1C6DE', '#EAEBDF']
    return (
        <div className={clsx(
            styles['image-palette'],
            'row'
        )}>
            <div className="col-lg-6">
                <img src={src} alt="preview" className="img-fluid" />
            </div>
            <div className={clsx('col-lg-6', styles['image-palette-content'])}>
                <Palette
                    className={styles['image-palette-items']}
                    colors={colors}
                />
                <div className={styles['image-palette-code']}>
                    <div className="fw-bold">Kode CSS</div>
                    <div className="mt-2">
                        {
                            colors.map((item, key) => <ColorCode key={key} name="testing" color={item} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

type PropsColorCode = {
    name: string
    color: string
}

const ColorCode: React.FC<PropsColorCode> = ({
    name,
    color
}) => {
    return (
        <div className={styles['color-code']}>
            <div className={styles['color-code-comment']}>{`/* Color Name: ${name} */`}</div>
            <div className={styles['color-code-css']}>
                <span>background-color : </span>
                <span className={styles['color-code-box']} style={{ backgroundColor: color }}></span>
                <span className={styles['color-code-value']}>{color}</span></div>
        </div>
    )
}