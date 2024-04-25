import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from './fire.js'


const collectionName = 'products'
const collectionRef = collection(db, collectionName)


async function getProducts() {
    try {
        const productsSnapshot = await getDocs(collectionRef);
        const productsList = productsSnapshot.docs.map(doc => withKey(doc));
        return productsList;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}



function withKey(doc) {
    console.log("Document object:", doc); // Logga doc-objektet för att se dess struktur
    let o = doc.data();
    o.key = doc.id;
    return o;
}

export { getProducts }
