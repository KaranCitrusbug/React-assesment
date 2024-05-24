import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Spin, Table } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";

interface ProductType {
  id: string;
  name: string;
  img: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
}

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const fetchProducts = query(collection(db, "products"));
      onSnapshot(fetchProducts, function productsList(snapShort) {
        let newProduct: ProductType[] = [];
        snapShort.docs.forEach((products) => {
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
        setProducts(newProduct);
      });
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const productDelete = doc(db, "products", id);
      await deleteDoc(productDelete);
      toast.error("Product deleted successfully", {
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting product: ", error);
      toast.error("Failed to delete product");
    }
  };
  const handleEdit = ()=>{
    console.log("edit")
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text: string) => (
        <img src={text} alt="product" style={{ width: 50 }} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "Price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (products: ProductType) => (
        <span>
          <Button  className="btn btn-primary me-1 action-btn" onClick={handleEdit}>Edit</Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(products.id)}
          >
            <Button type="text" className="btn btn-danger action-btn">Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <Spin className="loadingProduct" />
      ) : (
        <Table columns={columns} dataSource={products} className="mt-5" />
      )} 
    </>
  );
};

export default ProductListing;
