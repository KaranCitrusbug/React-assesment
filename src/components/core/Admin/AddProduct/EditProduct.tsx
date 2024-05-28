import { Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { ModalProps } from "../../../../types/ModalProps";
import Select, { SingleValue } from "react-select";
import { EditProductProps } from "../../../../types/EditProductType";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";

const EditProduct: React.FC<EditProductProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  initialValue,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [form] = Form.useForm();

  console.log(initialValue)
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
  const handleEditProduct = () => {
    form
      .validateFields()
      .then(async (updateValue) => {
        handleOk();
        if (initialValue) {
          const editProduct = doc(db, "products", initialValue.id);
          await updateDoc(editProduct, updateValue);
        }
       
        toast.success("Product updated successfully")
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleClose = () => {
    if (initialValue) {
      const selectedCategory = option.find(
        (option) => option.value === initialValue.category.value
      );
    
      setSelectedOption(selectedCategory || null);
      form.setFieldsValue({
        ...initialValue,
        category: selectedCategory,
      });
    }
    handleCancel();
  };
  useEffect(() => {
    if (initialValue) {
      const selectedCategory = option.find(
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
      title="Edit Product"
      open={isModalOpen}
      onOk={handleEditProduct}
      onCancel={handleClose}
      centered
      focusTriggerAfterClose
      okText="Edit Product"
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
           <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="img"
          label="Product Image:"
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
              min: 0,
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

export default EditProduct;
