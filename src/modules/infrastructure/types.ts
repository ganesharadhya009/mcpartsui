export interface AmbulanceQueryParams {
    pageSize: number;
    pageNumber: number;
  }
  
  export type GetAmbulancePayload = {
    id: number;
    vehicleNumber: string;
    driverDetails: string;
    ownership: string;
    facilities: string;
  }[];
  
  export type DataGridRow = GetAmbulancePayload;
  
  export type PaginationMode = "server" | 'client';