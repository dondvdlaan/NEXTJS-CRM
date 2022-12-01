import { SweetAlertOptions } from "sweetalert2";

// Messages in UI
export const CONFIRM_DELETE_MSSG: SweetAlertOptions<any, any>  = {
    title   : 'Estas seguro?',
    text    : 'No podras revertir esta accion',
    icon    : 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminarlo!',
    cancelButtonText: 'No, cancelar!',
}
export const DELETE_CONFIRMED_MSSG: SweetAlertOptions<any, any>  = {
    title   : 'Eliminado!',
    text    : 'Tu cliente ha sido eliminado',
    icon    : 'success',
}
export const ERROR_MSSG: SweetAlertOptions<any, any>  = {
    title   : 'Oops...',
    text    : 'Something went wrong!',
    icon    : 'error',
}

// General constants
export const RESET_MESSAGE  = {status: false, msg: ''};
export const INITIAL_VALUES = {email: '', password: ''};