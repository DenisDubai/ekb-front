import { jsonToQueryString } from '../utils/jsonToQueryString'

const getAllCategories = () => fetch('https://localhost:44322/api/ekb/categories').then(data=> data.json())

const getFilters = body => fetch(`https://localhost:44322/api/ekb/Filter${jsonToQueryString(body)}`).then(data=> data.json())

export {
    getAllCategories,
    getFilters
}