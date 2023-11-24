
function saveToExcel(formId) {
  const modalContent = document.getElementById(formId).innerHTML;

  // Create a basic Excel file content
  const excelContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                  <x:Name>Sheet 1</x:Name>
                  <x:WorksheetOptions>
                    <x:DisplayGridlines/>
                  </x:WorksheetOptions>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
            </x:ExcelWorkbook>
          </xml>
        <![endif]-->
      </head>
      <body>
        ${modalContent}
      </body>
    </html>`;

  // Create a data URI
  const dataUri = 'data:application/vnd.ms-excel;base64,' + btoa(excelContent);

  // Create a link element
  const link = document.createElement('a');
  link.href = dataUri;
  link.target = '_blank';
  link.download = 'modal_content.xls';

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click on the link to initiate the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}
