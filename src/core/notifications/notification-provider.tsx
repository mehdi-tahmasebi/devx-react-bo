import { styled } from "@mui/material/styles";
import {
  MaterialDesignContent,
  SnackbarProvider,
  type CustomContentProps,
} from "notistack";
import { type ComponentType, type ReactNode } from "react";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: theme.palette.success.main,
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: theme.palette.error.main,
    },
    "&.notistack-MuiContent-info": {
      backgroundColor: theme.palette.info.main,
    },
    "&.notistack-MuiContent-warning": {
      backgroundColor: theme.palette.warning.main,
    },
  }),
);

type NotificationProviderProps = {
  children: ReactNode;
};

export function NotificationProvider({ children }: NotificationProviderProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      preventDuplicate
      Components={{
        success: StyledMaterialDesignContent as ComponentType<CustomContentProps>,
        error: StyledMaterialDesignContent as ComponentType<CustomContentProps>,
        info: StyledMaterialDesignContent as ComponentType<CustomContentProps>,
        warning: StyledMaterialDesignContent as ComponentType<CustomContentProps>,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
