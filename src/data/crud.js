import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite'
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

async function addProduct(productData) {
    try {
        await addDoc(collectionRef, {
            image: productData.image,
            name: productData.name,
            price: productData.price,
            description: productData.description,
            category: productData.category,
        });
    } catch (error) {
        console.error("Error adding product to Firestore:", error);
        throw error;
    }
}

async function removeProduct(productKey, setProducts) {
    try {
        await deleteDoc(doc(db, collectionName, productKey));
        // Uppdatera produkterna efter borttagning
        const updatedProducts = await getProducts();
        setProducts(updatedProducts);
    } catch (error) {
        console.error("Error removing product from Firestore:", error);
        throw error;
    }
}



function withKey(doc) {
    let o = doc.data();
    o.key = doc.id;
    return o;
}

export { getProducts, productsList, addProduct, removeProduct }
