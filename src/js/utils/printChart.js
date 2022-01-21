import 'https://cdn.jsdelivr.net/npm/chart.js'

const printChart = ({ labels, label, data, element }) => {
  const config = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data,
        },
      ],
    },
    options: {},
  }

  const chart = new Chart(element, config)
}

export default printChart
