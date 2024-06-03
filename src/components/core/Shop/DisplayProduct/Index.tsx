import React, { useEffect, useState } from "react";

import debounce from "lodash.debounce";
import { Checkbox, Row, Col,  Pagination, Input } from "antd";
import Card from "./Card";
import { firebaseService } from "../../../../services/FirebaseService";
import { ToastFail } from "../../../../utils/ToastMessage";
import { ProductType } from "../../../../types/ProductType";
import Loading from "../../../../pages/loading/loading";

import "./style.css";


const { Search } = Input;

const DisplayProduct: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
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

  const handleSearch = debounce((value: string) => {
    setSearchLoading(true);
    setSearchQuery(value);
    filterProducts(selectedCategories, value);
    setTimeout(() => {
      setSearchLoading(false);
    }, 2000);
  }, 2000);

  const filterProducts = (categories: string[], query: string) => {
    let filtered = products;
    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category.value)
      );
    }
    if (query) {
      filtered = filtered.filter((product) =>
        product.category.value.toLowerCase().includes(query.toLowerCase())
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
        <Loading />
      ) : (
        <div className="row w-100 m-auto">
          <div className="col-lg-2 lo-md-2 col-sm-2 col-12 " >
            <div className="ps-2 mt-2">
              <Search
                placeholder="Search products"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
              <h6 className="mt-3">Categories</h6>
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
          </div>
          {searchLoading ? (
            <Loading />
          ) : (
            <div className="col-lg-10 col-md-10 col-sm-10 col-12 bg-light">
              <Card products={currentProducts} />

              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={filteredProducts.length}
                onChange={handlePageChange}
                className="text-center my-5"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayProduct;
