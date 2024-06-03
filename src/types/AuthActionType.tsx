export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LoginProps{
    type : typeof LOGIN,
    payload : string
}

interface LogoutProps{
    type : typeof LOGOUT
}

export type  AuthActionProps = LoginProps | LogoutProps