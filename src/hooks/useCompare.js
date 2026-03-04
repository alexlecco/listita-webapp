import vea from '../helpers/scrapping-vea.json'
import carr from '../helpers/scrapping-carr.json'
import gom from '../helpers/scrapping-gom.json'

const STORES = [
  { key: 'vea',  label: 'Super Vea', data: vea },
  { key: 'carr', label: 'Carrefour', data: carr },
  { key: 'gom',  label: 'Gomez P.',  data: gom },
]

const normalize = str => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export function useCompare(items) {
  const results = items.map(item => {
    const term = normalize(item)
    const prices = STORES.map(store => {
      const match = store.data.find(p =>
        normalize(p.name).includes(term) ||
        (p.brand && normalize(p.brand).includes(term)) ||
        (p.presentation && normalize(p.presentation).includes(term))
      )
      const matchedName = match
        ? [match.name, match.brand, match.presentation ? `de ${match.presentation}` : null].filter(Boolean).join(' ')
        : null
      return { label: store.label, price: match?.price ?? null, matchedName }
    })
    const validPrices = prices.filter(p => p.price !== null).map(p => p.price)
    const minPrice = validPrices.length ? Math.min(...validPrices) : null
    const matchedName = prices.find(p => p.matchedName)?.matchedName ?? item
    
    return { item, matchedName, prices, minPrice }
  })
  return { results, stores: STORES.map(s => s.label) }
}
