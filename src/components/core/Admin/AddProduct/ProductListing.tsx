import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Spin, Table, TableColumnsType } from "antd";
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
import EditProduct from "./EditProduct";
import { ProductType } from "../../../../types/ProductType";

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<ProductType | null>(null);
  const [pageSize, setPageSize] = useState<number>(5);

  const handleAddProduct = () => {
    setModalIsOpen(true);
  };
  const handleOk = () => {
    setModalIsOpen(false);
  };
  const handleCancel = () => {
    setModalIsOpen(false);
  };

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
  const handleEdit = (id: string) => {
    const product = products.find((product) => product.id === id);

    if (product) {
      setInitialValue(product);
      handleAddProduct();
    }
  };

  const columns: TableColumnsType = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width:150,
      render: (category :{
        value: string;
        label: string;
    }) => (
        <span>{category.value}</span>
      ),
      filters: [
        {
          text:'Men',
          value: 'Men',
        },
        {
          text:'Women',
          value: 'Women',
        },
        {
          text:'Kid',
          value: 'Kid',
        },
      ],
      filterMultiple:false,
      onFilter:(value ,record) =>record.category.indexOf(value)===0,
      
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
      key: "price",
      sorter:(a,b) => a.price - b.price
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter:(a,b) => a.quantity - b.quantity
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width:400,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      fixed: "right",
      render: (products: ProductType) => (
        <span>
          <Button
            className="btn btn-primary me-1 action-btn"
            onClick={() => handleEdit(products.id)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(products.id)}
          >
            <Button type="text" className="btn btn-danger action-btn">
              Delete
            </Button>
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
        <>
          <Table
            columns={columns}
            dataSource={products}
            pagination={{
              pageSize: pageSize,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10','15'],
              onShowSizeChange: (current, size) => setPageSize(size),
            }}
            scroll={{ x: 1200 }}
            className="mt-5"
          />
          <EditProduct
            isModalOpen={modalIsOpen}
            handleCancel={handleCancel}
            handleOk={handleOk}
            initialValue={initialValue}
          />
        </>
      )}
    </>
  );
};

export default ProductListing;
