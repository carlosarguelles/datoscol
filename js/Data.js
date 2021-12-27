import fetchData from './utils/fetchData.js'
import formatNumber from './utils/formatNumber.js'

class Data {
  constructor(data) {
    if (typeof data === 'undefined') {
      throw new Error('Cannot be called directly')
    }
    this.data = data
  }

  get years() {
    let years = []
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

  get poblationPerYear() {
    let poblation = []
    this.years.forEach(year => {
      poblation.push(this.poblationByYear(year))
    })
    return poblation
  }

  drawTable(year, element) {
    this.dataByYear(year).forEach(item => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
      <td class="px-2 py-4">${item['departamento']}</td>
      <td class="px-2 py-4">
        ${formatNumber(item['poblacion_5_16'])}
      </td>
      <td class="px-2 py-4">${item['aprobacion']} %</td>
      <td class="px-2 py-4">${item['desercion']} %</td>
    `
      element.appendChild(tr)
    })
  }

  drawOptions(element) {
    this.years.forEach(year => {
      const opt = document.createElement('option')
      opt.value = year
      opt.innerHTML = year
      element.appendChild(opt)
    })
  }

  static async build(API) {
    const data = await fetchData(API)
    return new Data(data)
  }
}

export default Data
