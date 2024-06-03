import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ProductType } from "../types/ProductType";
import { ToastFail, ToastSuccess } from "../utils/ToastMessage";
import { db } from "../firebase";

const Collections = {
  PRODUCTS: "products",
};

export const firebaseService = {
  fetchProducts: (callback: (products: ProductType[]) => void) => {
    try {
      const fetchProductsQuery = query(collection(db, Collections.PRODUCTS),orderBy("createdAt","desc"));
      
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
            createdAt: products.data().createdAt,  
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
      createdAt: Timestamp.now()
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
            createdAt: products.data().createdAt,
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
