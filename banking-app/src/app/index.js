import { fetchProducts } from "../features/Products/productSlice.js";
import store from "./store.js";

const unsubscribe = store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchProducts()).then(() => {
	console.log("updated State: ", JSON.stringify(store.getState(), null, 2));
})

unsubscribe()