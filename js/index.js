import { API } from './constants.js'
import Data from './Data.js'
import formatNumber from './utils/formatNumber.js'
import printChart from './utils/printChart.js'

const data = await Data.build(API)

const selectYear = document.getElementById('year')

let year = data.years[0]

data.drawOptions(selectYear)

const tableBody = document.getElementById('table-body')

data.drawTable(year, tableBody)

selectYear.addEventListener('change', async e => {
  year = e.target.value
  tableBody.innerHTML = ''
  data.drawTable(year, tableBody)
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

printChart({
  labels: data.years.reverse(),
  data: data.poblationPerYear.reverse(),
  element: document.getElementById('chart'),
  label: 'Población estudiantil por año',
})
