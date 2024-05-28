import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../../firebase";

import { Layout, Checkbox, Row, Col, Spin, Pagination } from "antd";

import { ProductType } from "../../../../types/ProductType";
import Card from "./Card";

import "./style.css";

const { Header, Sider, Content } = Layout;

const DisplayProduct: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

 
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
        setFilteredProducts(newProduct);
      });
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (checkedValues: string[]) => {
    setSelectedCategories(checkedValues);
    console.log(checkedValues);
    filterProducts(checkedValues);
  };

  const filterProducts = (categories: string[]) => {
    if (categories.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => categories.includes(product.category.value))
      );
    }
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts(selectedCategories);
  }, [products, selectedCategories]);
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <Layout style={{ minHeight: "100%" }}>
          <Layout >
            <Sider max-width={200}  style={{ background: "#fff" }}>
              <div style={{ padding: "10px" }}>
                <h3>Categories</h3>
                <Checkbox.Group onChange={handleCategoryChange}>
                  <Row>
                    <Col span={24}>
                      <Checkbox value="Men">Men</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="Women">Women</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="Kid">Kid</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  <Card
                    products={currentProducts}
                  />
                </div>
              </Content>
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={filteredProducts.length}
                onChange={handlePageChange}
                style={{ marginTop: "16px", textAlign: "center" }}
              />
            </Layout>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default DisplayProduct;
