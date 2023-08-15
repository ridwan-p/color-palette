import { Vector } from "models/KmeansModel"

export class DaviesBouldinIndex {
  protected vector: Vector[]
  protected centroids: Vector[]
  protected cluster: Vector[]

  constructor(vector: Vector[], cluster:Vector[], centroids:Vector[]) {
    this.vector = vector
    this.centroids = centroids
    this.cluster = cluster
  }
  /**
     * distance(X,Y) = sqrt(sum_i=1:n[(x_i-y_i)^2])
     * 
     * @param x 
     * @param y 
     * @return number
     */
  protected distance(x: Vector, y: Vector): number {
    if (x.length !== y.length) throw new Error("dimension error")

    let total = 0
    x.forEach((_, i) => {
      total += Math.pow(x[i] - y[i], 2)
    })
    return Math.sqrt(total)
  }

  protected assignCentroid(point: Vector): number {
    let min = Infinity
    let res: number = 0
    this.centroids.forEach((v, i) => {
      const dist = this.distance(point, v)
      if (dist < min) {
        min = dist
        res = i
      }
    });

    return res
  }
  public sswCalculation (vector: Vector[], cluster:Vector[], centroids:Vector[]) {
     // ssw calculation, c cluster yg diikuti
     const ssw: number[] = [];
     cluster.forEach((c, i) => {
       // distance calucation
       let totalDisc = 0;
       c.forEach((index) => {
         totalDisc += this.distance(vector[index], centroids[i])
       })
       ssw[i] = 1/c.length*totalDisc;
     })
     return ssw;
  }

  public ssbCalculation ( centroids:Vector[]) {
    // ssw calculation, c cluster yg diikuti
   const ssb: Vector[] = [];
   centroids.forEach((v1, i) => {
     ssb[i] = []
     centroids.forEach((v2, j) => {
       const totalDisc = this.distance(v1, v2)
       ssb[i][j] = totalDisc
     })
   })
   return ssb;
 }
 public rCalculation ( ssw:Vector, ssb: Vector[]) {
    // ssw calculation, c cluster yg diikuti
   const r: Vector[] = [];
   ssw.forEach((s1, i) => {
     r[i] = []
     ssw.forEach((s2, j) => {
       const total = ssb[i][j] ? (s1 + s2)/ssb[i][j] : 0;
       r[i][j] = total
     })
   })
   return r;
 }

 public rMaxCalculation(r:Vector[]) {
 
  const rMax:Vector = []
  r.forEach((v, i) => {
    rMax[i] = Math.max(...v)
  })
  return rMax;
 }

 public dbiCalculation(rMax:Vector) {
  const total = rMax.reduce((a,b) => a+b, 0);
  return 1/rMax.length * total;
 }

  public calculate() {
    // ssw calculation, c cluster yg diikuti
    const ssw = this.sswCalculation(this.vector, this.cluster, this.centroids);
    console.info('ssw', ssw);
    const ssb = this.ssbCalculation(this.centroids);
    console.info('ssb', ssb);
    const r = this.rCalculation(ssw, ssb);
    console.info('r', r);
    const rMax = this.rMaxCalculation(r);
    console.info('rMax', rMax);
    const dbi = this.dbiCalculation(rMax);
    console.info('dbi', dbi);
  }
}
