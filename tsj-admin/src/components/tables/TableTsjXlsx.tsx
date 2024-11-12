import  { useEffect } from 'react';
import {
  API_GET_TSJ_REPORT,
} from '../../constants/endpoints.ts';
import * as FileSaver from 'file-saver';
import $api from '../../api.ts';

const handleDownload = (blob: any, filename: string) => {
  FileSaver.saveAs(blob, filename);
};
const TableTsjXlsx = () => {

  useEffect(() => {
      const getTableData = async () => {
        try {
          const response = await $api.get(API_GET_TSJ_REPORT, { responseType: 'blob' });
          handleDownload(response.data, 'report.xlsx');
        } catch (error) {
          console.error(error);
        }
      };
        getTableData();
    }
    , )

}
export default TableTsjXlsx;