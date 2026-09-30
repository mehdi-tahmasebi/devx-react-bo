import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipBuildingHeader?: boolean;
    overrideBuildingHeaderId?: string | number;
  }

  export interface InternalAxiosRequestConfig {
    skipBuildingHeader?: boolean;
    overrideBuildingHeaderId?: string | number;
  }
}
