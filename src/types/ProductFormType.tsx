import { ProductType } from "./ProductType";

export interface ProductFromProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    initialValue?: ProductType | null;
    onSubmit: (values: ProductType) => void;
    okText: string;
}