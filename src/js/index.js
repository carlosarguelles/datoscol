import { API } from './constants.js'
import Data from './Data.js'
import formatNumber from './utils/formatNumber.js'
import printChart from './utils/printChart.js'
import showData from './utils/showData.js'

const data = await Data.build(API)

const selectYear = document.getElementById('year')

let year = data.years[0]

data.years.forEach(year => {
  const opt = document.createElement('option')
  opt.value = year
  opt.innerHTML = year
  selectYear.appendChild(opt)
})

const tableBody = document.getElementById('table-body')

const drawTable = () => {
  data.dataByYear(year).forEach(obj => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td class="px-2 py-4">${obj['departamento']}</td>
      <td class="px-2 py-4">
        ${formatNumber(obj['poblacion_5_16'])}
      </td>
      <td class="px-2 py-4">${obj['aprobacion']} %</td>
      <td class="px-2 py-4">${obj['desercion']} %</td>
      <td class="px-2 py-4">${obj['reprobacion']} %</td>
      <td class="px-2 py-4">${obj['repitencia']} %</td>
    `
    tr.appendChild(showData({ data: obj }))
    tableBody.appendChild(tr)
  })
}

drawTable()

selectYear.addEventListener('change', async e => {
  year = e.target.value
  tableBody.innerHTML = ''
  drawTable()
})

const countButton = document.getElementById('count')

countButton.addEventListener('click', e => {
  alert(
    `Cantidad de alumnos en ${year}: ${formatNumber(
      data.poblationByYear(year)
    )}`
  )
  e.preventDefault()
})

const maxButton = document.getElementById('stats')

maxButton.addEventListener('click', e => {
  const { maxOf, minOf } = data

  const getStat = (fn, key) => {
    const obj = fn(year, key)
    return `${obj['departamento']} con un ${obj[key]} %`
  }

  const stats = {
    '✅ Mayor aprobación': getStat(maxOf, 'aprobacion'),
    '🔻 Menor aprobación': getStat(minOf, 'aprobacion'),
    '✅ Mayor deserción': getStat(maxOf, 'desercion'),
    '🔻 Menor deserción': getStat(minOf, 'desercion'),
    '✅ Mayor reprobación': getStat(maxOf, 'reprobacion'),
    '🔻 Menor reprobación': getStat(minOf, 'reprobacion'),
    '✅ Mayor repitencia': getStat(maxOf, 'repitencia'),
    '🔻 Menor repitencia': getStat(minOf, 'repitencia'),
  }

  let alertText = new String(`En ${year}: \n----\n`)

  Object.entries(stats).forEach(([k, v]) => {
    alertText += `${k}: ${v} \n----\n`
  })

  alert(alertText)

  e.preventDefault()
})

printChart({
  labels: data.years.reverse(),
  data: data.poblationPerYear.reverse(),
  element: document.getElementById('chart'),
  label: 'Población estudiantil por año',
})
