import { COVALENT_KEY } from "./constants"
import axios from 'axios'

export const ACTIVE_COIN = 'DAI'
const TOPIC = '0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a'
// https://www.covalenthq.com/docs/developer/primer/query-historical-aave-borrow-rate-with-primer/
const PRIMER_STRING = "[{%22$match%22:{%22decoded.params.0.value%22:%220x6b175474e89094c44da98b954eedeac495271d0f%22}},{%22$group%22:{%22_id%22:{%22year%22:{%22$year%22:%22block_signed_at%22},%22month%22:{%22$month%22:%22block_signed_at%22},%22day%22:{%22$dayOfMonth%22:%22block_signed_at%22}},%22count%22:{%22$sum%22:1},%22variable_borrow_rate%22:{%22$avg%22:%22decoded.params.3.value%22}}}]"

export const getHistoricRates= (address)  => {
    address = address || '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' // DAi default
    const startBlock = 14700000;
    const url = `https://api.covalenthq.com/v1/1/events/topics/${TOPIC}/?starting-block=${startBlock}&ending-block=latest&primer=${PRIMER_STRING}&sender-address=${address}&key=${COVALENT_KEY}`
    return axios.get(url)
}