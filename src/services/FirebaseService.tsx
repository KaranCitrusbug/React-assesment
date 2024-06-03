import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { ProductType } from "../types/ProductType";
import { ToastFail, ToastSuccess } from "../utils/ToastMessage";

const Collections = {
  PRODUCTS: "products",
};

export const firebaseService = {
  fetchProducts: (callback: (products: ProductType[]) => void) => {
    try {
      const fetchProductsQuery = query(collection(db, Collections.PRODUCTS));
      
      onSnapshot(fetchProductsQuery, (snapshot) => {
        let newProduct: ProductType[] = [];
        snapshot.docs.forEach((products) => {
          newProduct.push({
            id: products.id,
            name: products.data().name,
            img: products.data().img,
            category: products.data().category,
            description: products.data().description,
            price: products.data().price,
            quantity: products.data().quantity,
          });
        });
        callback(newProduct);
      });
    } catch (error: any) {
      ToastFail("Error fetching products: " + error);
    }
  },

  handleDeleteData: async (id: string) => {
    try {
      const productDelete = doc(db, Collections.PRODUCTS, id);
      await deleteDoc(productDelete);
      ToastSuccess("Product deleted successfully");
    } catch (error) {
      ToastFail("Failed to delete product" + error);
    }
  },

  addProductData: async (values: ProductType) => {
    await addDoc(collection(db, Collections.PRODUCTS), {
      ...values,
      id: Date.now().toString(),
    });
  },
  editProductData: async (values: ProductType, productId: string) => {
    await updateDoc(doc(db, Collections.PRODUCTS, productId), { ...values });
    ToastSuccess("Product updated successfully");
  },

  getSingleProduct: async (productId: string) => {
    try {
      const product = await getDoc(doc(db, Collections.PRODUCTS, productId));
      return product.exists() ? (product.data() as ProductType) : null;
    } catch (error) {
      ToastFail("Error fetching product:" + error);
    }
  },
  getSimilarProduct : async(category : string , productId  : string , callback: (product : ProductType[])=> void )=>{
    try{
      const relatedQuery = query(
        collection(db, Collections.PRODUCTS),
        where("category.value", "==", category),
        where("id", "!=", productId)
      );
      onSnapshot(relatedQuery,(snapShort)=>{
        const relatedProductsData: ProductType[] =[];
         snapShort.docs.forEach((products) => {
          relatedProductsData.push({
            id: products.id,
            name: products.data().name,
            img: products.data().img,
            category: products.data().category,
            description: products.data().description,
            price: products.data().price,
            quantity: products.data().quantity,
          });
          callback(relatedProductsData)
        });

      })
    }
    catch(error){
      ToastFail("Something went wrong" + error)
    }

  }
};
