import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from './fire.js'


const collectionName = 'products'
const collectionRef = collection(db, collectionName)
let productsList = []

async function getProducts() {
    try {
        const productsSnapshot = await getDocs(collectionRef);
        productsList = productsSnapshot.docs.map(doc => withKey(doc));
        return productsList;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}



function withKey(doc) {
    let o = doc.data();
    o.key = doc.id;
    return o;
}

export { getProducts, productsList }
