import React, { useState } from "react";
import { Form, Input, InputNumber, Modal } from "antd";

import Select, { SingleValue } from "react-select";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";

import { ModalProps } from "../../../../types/ModalProps";

import "./style.css";

const AddProduct: React.FC<ModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [form] = Form.useForm();

  const productData = collection(db, "products");

  const option = [
    {
      value: "Men",
      label: "Men",
    },
    {
      value: "Women",
      label: "Women",
    },
    {
      value: "Kid",
      label: "Kid",
    },
  ];

  const handleSelect = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedOption(option);
    form.setFieldsValue({ category: option });
  };

  const handleProduct = () => {
    form
      .validateFields()
      .then(async (values) => {
        handleOk();
        
        await addDoc(productData, {
          name: values.name,
          description: values.description,
          img: values.img_URL,
          id: Date.now().toString(),
          category: selectedOption ? selectedOption.value : '',
          price: values.price,
          quantity: values.quantity,
        });

        form.resetFields();
        setSelectedOption(null);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleClose = () => {
    form.resetFields();
    handleCancel();
  };

  return (
    <Modal
      title="Add Product"
      open={isModalOpen}
      onOk={handleProduct}
      onCancel={handleClose}
      centered
      focusTriggerAfterClose
      okText="Add Product"
      okButtonProps={{ className: "okButton" }}
      cancelButtonProps={{ className: "cancelButton" }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Product Name:"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter name of the product!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Product Description:"
          rules={[
            {
              required: true,
              message: "Please enter description of the product!",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="img_URL"
          label="Product URL:"
          rules={[
            {
              required: true,
              message: "Please enter URL of the product!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Product Price:"
          rules={[
            {
              required: true,
              message: "Please enter price of the product!",
            },
            { type: "number", min: 0, message: "Price cannot be negative!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Product Quantity:"
          rules={[
            {
              required: true,
              message: "Please enter quantity of the product!",
            },
            {
              type: "number",
              min: 1,
              message: "You must have at least 1 quantity of the product!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="category"
          label="Product Category:"
          rules={[
            {
              required: true,
              message: "Please select category of the product!",
            },
          ]}
        >
          <Select
            value={selectedOption}
            onChange={handleSelect}
            options={option}
            isClearable
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
