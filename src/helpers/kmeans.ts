type Vector = number[]

export class Kmeans {
  protected k: number
  protected vector: Vector[]
  protected centroids: Vector[]
  protected cluster: Vector[]

  constructor(vector: Vector[], k: number) {
    if (k > vector.length)
      throw new Error('Required: # of points >= # of clusters');

    this.k = k
    this.vector = vector
    this.centroids = this.createCentroids(vector, k)
    this.cluster = this.centroids.map(() => vector[0].map(() => 0))
  }

  createCentroids(vector: Vector[], k: number) {
    const rand = vector.sort(() => (Math.floor(Math.random() * vector.length)))
    return rand.slice(0, k);
  }

  setVector(vector: Vector[]) {
    this.vector = vector
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
    })

    return res
  }

  public calculate(): Vector[] {
    const newCluster: Vector[] = this.centroids.map(() => [])

    let vecArr: Vector[] = this.centroids.map(() => this.vector[0].map(() => 0))

    this.vector.forEach((v, i) => {
      const res = this.assignCentroid(v)
      newCluster[res].push(i)

      v.forEach((a, j) => {
        vecArr[res][j] += a
      })
    })

    // let distance = 0
    // let max = 0
    vecArr = vecArr.map((x, i) => {
      const clusterSize = newCluster[i] ? newCluster[i].length : 0

      // distance = this.distance(vecArr[i], this.centroids[i])
      // if (distance > max)
      //   max = distance

      return x.map(y => {
        const total = Math.floor(y / clusterSize)
        return !isNaN(total) ? total : 0
      })
    })
    // console.log('max', max)
    // if (max <= 0.5) {
    //   return vecArr
    // }
    if (this.isEqual(this.cluster, newCluster)) {
      return vecArr
    }

    this.cluster = newCluster
    this.centroids = vecArr

    // return vecArr
    return this.calculate()
  }

  protected isEqual(oldCluster: Vector[], newCluster: Vector[]): boolean {
    for (let i = 0; i < this.k; i++) {
      const tmpOld = oldCluster[i]
      const tmpNew = newCluster[i]

      if (tmpOld.length !== tmpNew.length) return false

      for (let j = 0; j < tmpOld.length; j++) {
        if (tmpOld[j] !== tmpNew[j]) return false
      }
    }

    return true
  }
}
