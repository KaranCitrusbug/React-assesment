import { ModalProps } from "./ModalProps";
import { ProductType } from "./ProductType";

export interface EditProductProps extends ModalProps{
    initialValue : ProductType | null;
}