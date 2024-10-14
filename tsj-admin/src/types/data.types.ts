export interface TableDataType {
  key: string;
  name: string;
  resident: "Жилец" | "Арендатор";
  address: string;
  flat: string;
  hot_meters: string;
  cold_meters: string;
}

export interface ITsj {
  key: string;
  name: string;
}

export interface IStreet extends ITsj{
}

export interface UserResponse {
  login: string;
  firstName: string;
  lastName: string;
  surName: string;
  phoneNumber: string;
  serialNumber: string;
  valueHistory: {
    id: number;
    value: string;
    date: number;
    meter: {
      id: number;
      serialNumber: string | null;
      resource: string | null;
      installationDate: string | null;
      flat: string | null;
    };
    cost: number;
  };
}

export interface Props {
  onChange: (value: string) => void;
}