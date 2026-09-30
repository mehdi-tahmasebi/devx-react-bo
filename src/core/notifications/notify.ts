import {
  closeSnackbar,
  enqueueSnackbar,
  type OptionsObject,
} from "notistack";

export const notify = {
  success(message: string, options?: OptionsObject) {
    enqueueSnackbar(message, { variant: "success", ...options });
  },
  error(message: string, options?: OptionsObject) {
    enqueueSnackbar(message, { variant: "error", ...options });
  },
  info(message: string, options?: OptionsObject) {
    enqueueSnackbar(message, { variant: "info", ...options });
  },
  warning(message: string, options?: OptionsObject) {
    enqueueSnackbar(message, { variant: "warning", ...options });
  },
  dismiss(key?: string | number) {
    closeSnackbar(key);
  },
} as const;
