import React, { useEffect } from "react"
import { Button } from "../demo/Button"
import '../styles/demo/index.scss'

type Props = {

}

export const Demo: React.FC<Props> = ({

}) => {
  useEffect(() => {
    const root = document.documentElement
    console.info('root', root)
    if (root) {
      root.style.setProperty('--demo-primary', '#B7CADB')
    }
  }, [])
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <Button className="btn-primary">Testing</Button>
        </div>
        <div className="col">
          <Button className="btn-success">Testing</Button>
        </div>
        <div className="col">
          <Button className="btn-info">Testing</Button>
        </div>
        <div className="col">
          <Button className="btn-warning">Testing</Button>
        </div>
        <div className="col">
          <Button className="btn-danger">Testing</Button>
        </div>
        <div className="col">
          <Button className="btn-light">Testing</Button>
        </div>
        <div className="col">
          <Button className="btn-dark">Testing</Button>
        </div>
        <div className="col">
          <Button className="btn-link">Testing</Button>
        </div>
      </div>
    </div>
  )
}