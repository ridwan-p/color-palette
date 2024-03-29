import { Vector } from "models/KmeansModel"
import { DaviesBouldinIndex } from "./davies-bouldin-index"

type Calcuate = {
  onProgress?(progress: number): void,
}
export class Kmeans {
  protected k: number
  protected vector: Vector[]
  protected centroids: Vector[]
  protected cluster: Vector[]
  protected progress: number = 0

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

  public run(params?: Calcuate): Promise<Vector[]> {
    this.progress = 0
    return this.calculate(params)
  }

  protected calculate(params?: Calcuate): Promise<Vector[]> {

    // progress calculation 
    if (params?.onProgress) params.onProgress(this.progress++)

    const newCluster: Vector[] = this.centroids.map(() => [])

    let vecArr: Vector[] = this.centroids.map(() => this.vector[0].map(() => 0))

    this.vector.forEach((v, i) => {
      const res = this.assignCentroid(v)
      // save index cluster 
      newCluster[res].push(i)

      v.forEach((a, j) => {
        vecArr[res][j] += a
      })
    })

    vecArr = vecArr.map((x, i) => {
      const clusterSize = newCluster[i] ? newCluster[i].length : 0

      // referensi https://www.baeldung.com/java-k-means-clustering-algorithm
      // when cluster size is empty , return centroid
      if (!clusterSize) return x
      return x.map(y => Math.floor(y / clusterSize))
    })

    if (this.isEqual(this.cluster, newCluster)) {
      this.progress = 100
      // console.info('Data', this.vector);
      // console.info('cluster', newCluster);
      console.info('centroid', vecArr);
      const evaluation = new DaviesBouldinIndex(this.vector, newCluster, this.centroids)
      evaluation.calculate()
      return new Promise((resolve) => {
        resolve(vecArr)
      })
    }

    this.cluster = newCluster
    this.centroids = vecArr
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.calculate(params))
      })
    })
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
