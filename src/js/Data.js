import fetchData from './utils/fetchData.js'

class Data {
  constructor(data) {
    if (typeof data === 'undefined') {
      throw new Error('Cannot be called directly')
    }
    this.data = data
  }

  get years() {
    let years = new Array()
    this.data.forEach(obj => {
      if (!years.includes(obj['ano'])) {
        years.push(obj['ano'])
      }
    })
    return years.reverse()
  }

  dataByYear(year) {
    return this.data.filter(obj => obj['ano'] == year)
  }

  poblationByYear(year) {
    let count = 0
    this.dataByYear(year).forEach(
      obj => (count += Number(obj['poblacion_5_16']))
    )
    return count
  }

  getSingleKeyValues(year, key) {
    const values = new Array()
    this.dataByYear(year).forEach(obj => {
      values.push(obj[key])
    })
    return values
  }

  maxOf = (year, key) => {
    const max = Math.max.apply(Math, this.getSingleKeyValues(year, key))
    return this.dataByYear(year).find(obj => Number(obj[key]) === max)
  }

  minOf = (year, key) => {
    const min = Math.min.apply(Math, this.getSingleKeyValues(year, key))
    return this.dataByYear(year).find(obj => Number(obj[key]) === min)
  }

  get poblationPerYear() {
    let poblation = new Array()
    this.years.forEach(year => {
      poblation.push(this.poblationByYear(year))
    })
    return poblation
  }

  static async build(API) {
    const data = await fetchData(API)
    return new Data(data)
  }
}

export default Data
