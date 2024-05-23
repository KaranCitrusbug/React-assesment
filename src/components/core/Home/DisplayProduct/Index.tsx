import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Spin } from 'antd';
import './style.css'
const Index:React.FC = () => {
    const [products, setProducts] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const q = query(collection(db, "products"));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot);
            const productsList = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(productsList);
            setProducts(productsList);
          } catch (error) {
            console.error("Error fetching products: ", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, []);
  return (
    <>
            {loading ? (
        <Spin className="loadingProduct" />
      ) : (
        products.map(function (product: any) {
          return (
            <div key={product.id}>
              {product.name}
              <img src={product.img} alt="img" />
              {product.price}
              
              {/* {product.description} */}
              {/* {product.category} */}
            </div>
          );
        })
      )}
    </>    
  )
}

export default Index
