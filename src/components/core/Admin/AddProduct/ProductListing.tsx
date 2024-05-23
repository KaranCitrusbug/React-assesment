import React from "react";
import { Table, TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  category: string;
  age: number;
  address: string;
}

const ProductListing: React.FC = () => {
const columns: TableColumnsType<DataType> = [
    {
      title: "category",
      dataIndex: "category",
      filters: [
        {
          text: "Men's",
          value: "Men",
          children: [
            {
              text: "Top Wear",
              value: "top wear",
              children: [
                {
                  text: "T-Shirt",
                  value: "t-shirt",
                },
                {
                  text: "Shirt",
                  value: "shirt",
                },
                {
                  text: "Formal Shirt",
                  value: "formalShirt",
                },
                {
                  text: "Casual shirt",
                  value: "casualShirt",
                },
              ],
            },
            {
              text: "Bottom Wear",
              value: "bottom wear",
              children: [
                {
                  text: "Jeans",
                  value: "jeans",
                },
                {
                  text: "Casual Trouser",
                  value: "casualTrouser",
                },
                {
                  text: "Cargos",
                  value: "cargos",
                },
                {
                  text: "Shorts",
                  value: "shorts",
                },
              ],
            },
          ],
        },
        {
          text: "Women's",
          value: "women",
          children: [
            {
              text: "Top Wear",
              value: "top wear",
              children: [
                {
                  text: "T-Shirt",
                  value: "t-shirt",
                },
                {
                  text: "Shirt",
                  value: "shirt",
                },
                {
                  text: "Formal Shirt",
                  value: "formalShirt",
                },
                {
                  text: "Casual shirt",
                  value: "casualShirt",
                },
              ],
            },
            {
              text: "Bottom Wear",
              value: "bottom wear",
              children: [
                {
                  text: "Jeans",
                  value: "jeans",
                },
                {
                  text: "Casual Trouser",
                  value: "casualTrouser",
                },
                {
                  text: "Cargos",
                  value: "cargos",
                },
                {
                  text: "Shorts",
                  value: "shorts",
                },
              ],
            },
          ],
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.category.includes(value as string),
      width: "30%",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value as string),
      filterSearch: true,
      width: "40%",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      category: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      category: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      category: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      category: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default ProductListing;
