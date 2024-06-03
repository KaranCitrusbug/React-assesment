// ProductForm.tsx

import React, { useEffect, useState } from "react";

import { Form, Input, InputNumber, Modal, Upload } from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Select, { SingleValue } from "react-select";
import { RcFile } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { ProductFromProps } from "../../../../types/ProductFormType";
import { Option } from "../../../../utils/ConstFile";
import { ToastFail, ToastSuccess } from "../../../../utils/ToastMessage";
import { ProductType } from "../../../../types/ProductType";
import { storage } from "../../../../firebase";

import "./style.css";

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
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    

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

  const handleUpload = (file: File) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(uploadTask)
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          
        },
        (error) => {
          ToastFail("Upload failed");
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            ToastFail("Failed to get download URL");
            reject(error);
          }
        }
      );
    });
  };
  const handleImageUpload = async (file: RcFile, fileList: RcFile[]) => {
    try {
      const url = await handleUpload(file);
      setImageUrl(url as string);
      ToastSuccess("Image uploaded successfully");
    } catch (error) {
      ToastFail("Image upload failed");
    }
  };
  const handleAddFinish = () =>{
    form.validateFields().then((values: ProductType) => {
      if (imageUrl) {
        values.img = imageUrl; 
      }
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
      if (imageUrl) {
        values.img = imageUrl; 
      }
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
        {/* <Form.Item
          name="img"
          label="Product URL:"
          rules={[
            { required: true, message: "Please enter URL of the product!" },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
        label="Image"
        name="img"
        rules={[{ required: true, message: 'Image is required' }]}
      >
        <Upload
          beforeUpload={handleImageUpload}
          listType="picture-card"
          maxCount={1}
        >
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
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
