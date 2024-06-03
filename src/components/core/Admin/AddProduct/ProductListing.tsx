import React, { useEffect, useState } from "react";

import { Button, Popconfirm, Spin, Table, TableColumnsType } from "antd";
import ProductForm from "./ProductForm";
import { ProductType } from "../../../../types/ProductType";
import { firebaseService } from "../../../../services/FirebaseService";

import "./style.css";

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

  const fetchProductsData = async () => {
    setLoading(true);
    firebaseService.fetchProducts((newProducts) => {
      setProducts(newProducts);
      setLoading(false);
    });
  };
  const handleEditProduct = async (values: ProductType) => {
    if (initialValue) {
      firebaseService.editProductData(values, initialValue.id);
    }
  };
  const handleDelete = async (id: string) => {
    await firebaseService.handleDeleteData(id);
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
      width: 150,
      render: (category: { value: string; label: string }) => (
        <span>{category.value}</span>
      ),
      filters: [
        {
          text: "Men",
          value: "Men",
        },
        {
          text: "Women",
          value: "Women",
        },
        {
          text: "Kid",
          value: "Kid",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.category.value.indexOf(value) === 0,
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text: string) => (
        <img src={text} alt="product" style={{ width: 50 ,mixBlendMode:"darken"}} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "Action",
      key: "action",
      width: 200,

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
    fetchProductsData();
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
              pageSizeOptions: ["5", "10", "15"],
              onShowSizeChange: (current, size) => setPageSize(size),
            }}
            scroll={{ x: 1200 }}
            className="mt-5"
          />
          <ProductForm
            isModalOpen={modalIsOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            initialValue={initialValue}
            onSubmit={handleEditProduct}
            okText="Edit Product"
          />
        </>
      )}
    </>
  );
};

export default ProductListing;
