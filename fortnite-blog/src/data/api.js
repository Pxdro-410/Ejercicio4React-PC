const BASE_URL = 'https://fortnite-api.com/v2'

export async function fetchSkins(searchTerm = '') {
  const res = await fetch(`${BASE_URL}/cosmetics/br?language=es`)
  if (!res.ok) throw new Error('Error al obtener los cosméticos')
  const json = await res.json()

  const skins = json.data.filter(item => item.images?.icon)

  if (searchTerm.trim() === '') return skins

  return skins.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export async function fetchSkinById(id) {
  const res = await fetch(`${BASE_URL}/cosmetics/br/${id}`)
  if (!res.ok) throw new Error('Skin no encontrada')
  const json = await res.json()
  return json.data
}

export async function fetchNews() {
  const res = await fetch(`${BASE_URL}/news/br?language=es`)
  if (!res.ok) throw new Error('Error al obtener las noticias')
  const json = await res.json()
  return json.data?.motds ?? []
}