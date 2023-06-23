import Excel from "exceljs";
//Required:
// data
// filename
// sheetname = optional

type TExcel = {
  data: Record<string, any>[];
  columns: Partial<Excel.Column>[];
  filename: string;
  sheetname?: string;
};

export function writeExcel({ data, columns, filename, sheetname }: TExcel) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(sheetname);

  worksheet.columns = columns;

  worksheet.addRows(data);

  return workbook.xlsx.writeBuffer();
}
