const omitValues = [
  'ano',
  'c_digo_departamento',
  'departamento',
  'poblacion_5_16',
  'aprobacion',
  'desercion',
  'reprobacion',
  'cobertura_bruta_transicion',
  'cobertura_bruta_primaria',
  'cobertura_bruta_secundaria',
  'cobertura_bruta_media',
  'cobertura_neta_transicion',
  'cobertura_neta_primaria',
  'cobertura_neta_secundaria',
  'cobertura_neta_media',
  'repitencia',
]

const showData = ({ data }) => {
  const td = document.createElement('td')
  const button = document.createElement('button')

  button.className =
    'appareance-none hover:underline text-indigo-500 font-semibold'

  let alertText = new String()

  Object.entries(data)
    .filter(([k]) => !omitValues.includes(k))
    .forEach(([k, v]) => {
      const parsedKey = new String(k.charAt(0).toUpperCase() + k.slice(1))
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/[0-9]/g, '')
      alertText += `${parsedKey}: ${v}\n`
    })

  button.onclick = () => {
    alert(alertText)
  }

  button.innerText = 'Ver más'

  td.appendChild(button)

  return td
}

export default showData
