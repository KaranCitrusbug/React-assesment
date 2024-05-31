import { AuthStateProps } from "./AuthStateProp";
import { CartState } from "./CartStateProps";

export interface RootState{
    cart : CartState
    auth : AuthStateProps
}