import { ACTIONS } from "../components/ProductList";

export default function filterProducts(products, filterOption) {
	if (!products || !Array.isArray(products) || products.length < 1) {
		return []
	}
	const tempProducts = [...products]
	switch (filterOption) {
		case ACTIONS.SORT_BY_NAME_ASC:
			return tempProducts.sort((a, b) => a.title.localeCompare(b.title))
		case ACTIONS.SORT_BY_NAME_DESC:
			return tempProducts.sort((a, b) => b.title.localeCompare(a.title))
		case ACTIONS.SORT_BY_PRICE_ASC:
			return tempProducts.sort((a, b) =>  parseInt(String(a.price)[0]) - parseInt(String(b.price)[0]))
		case ACTIONS.SORT_BY_PRICE_DESC:
			return tempProducts.sort((a, b) => parseInt(String(b.price)[0]) - parseInt(String(a.price)[0]))
		default:
			return tempProducts
	}

}

