import React, { useEffect, useState } from "react";

import { Layout, Checkbox, Row, Col, Spin, Pagination, Input } from "antd";

import { firebaseService } from "../../../../services/FirebaseService";
import { ToastFail } from "../../../../utils/ToastMessage";
import { ProductType } from "../../../../types/ProductType";
import Card from "./Card";

import "./style.css";

const { Sider, Content } = Layout;
const { Search } = Input;

const DisplayProduct: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const fetchProducts = async () => {
    try {
      firebaseService.fetchProducts((newProduct) => {
        setProducts(newProduct);
        setFilteredProducts(newProduct);
      });
    } catch (error) {
      ToastFail("Error fetching products: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (checkedValues: string[]) => {
    setSelectedCategories(checkedValues);
    filterProducts(checkedValues, searchQuery);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    filterProducts(selectedCategories, value);
  };

  const filterProducts = (categories: string[], query: string) => {
    let filtered = products;
    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category.value)
      );
    }
    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
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
    filterProducts(selectedCategories, searchQuery);
  }, [products, selectedCategories, searchQuery]);

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <Layout style={{ minHeight: "100%" }}>
          <Layout>
            <Sider max-width={200} style={{ background: "#fff" }}>
              <div style={{ padding: "10px" }}>
                <Search
                  placeholder="Search products"
                  onSearch={handleSearch}
                  enterButton
                />
                <h3 className="mt-3">Categories</h3>
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
                  <Card products={currentProducts} />
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
