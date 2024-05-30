// ProductForm.tsx

import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

import { Form, Input, InputNumber, Modal } from "antd";

import { ProductFromProps } from "../../../../types/ProductFormType";
import { Option } from "../../../../utils/ConstFile";
import { ToastFail } from "../../../../utils/ToastMessage";

import "./style.css";
import { ProductType } from "../../../../types/ProductType";

const ProductForm: React.FC<ProductFromProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  initialValue,
  onSubmit,
  okText,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<{ value: string; label: string }>>(null);

  const [form] = Form.useForm();

  const handleSelect = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedOption(option);
    form.setFieldsValue({ category: option });
  };

  const handleAddClose = () => {
    form.resetFields();
    handleCancel();
  };

  const handleClose = () => {
    handleCancel();
  };
  const handleAddFinish = () =>{
    form.validateFields().then((values: ProductType) => {
      onSubmit(values);
      form.resetFields();
      setSelectedOption(null);
      handleOk();
    }).catch((info:string) => {
      ToastFail(info);
    });
  }

  const handleFinish = () => {
    form.validateFields().then((values : ProductType) => {
      onSubmit(values);
      setSelectedOption(null);
      handleOk();
    }).catch((info) => {
      ToastFail(info);
    });
  };
  useEffect(() => {
    if (initialValue) {
      const selectedCategory = Option.find(
        (option) => option.value === initialValue.category.value
      );
      setSelectedOption(selectedCategory || null);
      form.setFieldsValue({
        ...initialValue,
        category: selectedCategory,
      });
    }
  }, [initialValue]);

  return (
    <Modal
      title={okText === "Add Product" ? "Add Product" : "Edit Product"}
      open={isModalOpen}
      onOk={okText === "Add Product" ? handleAddFinish : handleFinish}
      onCancel={okText === "Add Product" ? handleAddClose : handleClose}
      centered
      focusTriggerAfterClose
      okText={okText}
      okButtonProps={{ className: "okButton" }}
      cancelButtonProps={{ className: "cancelButton" }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Product Name:"
          name="name"
          rules={[
            { required: true, message: "Please enter name of the product!" },
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
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="img"
          label="Product URL:"
          rules={[
            { required: true, message: "Please enter URL of the product!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Product Price:"
          rules={[
            { required: true, message: "Please enter price of the product!" },
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
            options={Option}
            isClearable
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
