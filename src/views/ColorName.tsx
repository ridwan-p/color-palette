import { useMemo, useState } from "react"
import { InputGroup } from "components"
import { Color } from "components/color/Color"
import clsx from "clsx"
import { colorName, hex2RGB, rgb2HSL, rgb2HSV } from "helpers/colors"
import styles from "./ColorName.module.scss"

export const ColorName = () => {
  const [search, setSearch] = useState<string>("")
  const [hex, setHex] = useState('#7ba8e5')

  const data = useMemo(() => {
    const rgb = hex2RGB(hex)
    const hsv = rgb2HSV(rgb)
    const hsl = rgb2HSL(rgb)
    const name = colorName(rgb)

    return { rgb, hsl, hsv, name }
  }, [hex])

  const handleClickSearch = () => {
    setHex(search)
  }

  return (
    <>
      <form className="py-5 d-flex justify-content-center" onSubmit={(e) => { e.preventDefault(); handleClickSearch() }}>
        <InputGroup
          onChangeValue={e => setSearch(e.target.value)}
          value={search}
          placeholder={`Masukkan nilai hexa warna (  ${hex} )`}
          onClick={handleClickSearch}
          btnLabel="Info"
          className={styles.search}
        />
      </form>
      <div className="row">
        <div className="col-md-5">
          <Color color={hex} />
        </div>
        <div className="col-md-7 pt-4">
          <div className={clsx('fw-bold text-primary pb-4', styles['name-color'])}>
            <h4>{data.name} ( serupa ) </h4>
            <div className="text-info">Warna | {hex}</div>
          </div>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Hex</td>
                <td>{hex}</td>
              </tr>
              <tr>
                <td>RGB</td>
                <td>rgb({data.rgb.r}, {data.rgb.g}, {data.rgb.b})</td>
              </tr>
              <tr>
                <td>HSL</td>
                <td>{data.hsl.h}° , {data.hsl.s}% , {data.hsl.l}%</td>
              </tr>
              <tr>
                <td>HsvColor</td>
                <td>{data.hsv.h}° , {data.hsv.s}% , {data.hsv.v}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}