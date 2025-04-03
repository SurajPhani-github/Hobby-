import type { ChallengeRegistration } from '../store/useStore';
import ExcelJS from 'exceljs';
import moment from 'moment';

// Create a new workbook
function createWorkbook() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Registrations');

  // Define columns
  worksheet.columns = [
    { header: 'Ticket Number', key: 'ticketNumber', width: 15 },
    { header: 'Registration Date', key: 'registrationDate', width: 20 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Username', key: 'username', width: 20 },
    { header: 'Portfolio', key: 'portfolio', width: 40 },
    { header: 'Experience', key: 'experience', width: 40 },
    { header: 'Motivation', key: 'motivation', width: 40 },
    { header: 'Challenge ID', key: 'challengeId', width: 15 },
    { header: 'Domain ID', key: 'domainId', width: 15 }
  ];

  // Style the header row
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  return workbook;
}

async function saveRegistration(registration: Omit<ChallengeRegistration, 'id' | 'registrationDate' | 'ticketNumber'>) {
  try {
    // Create a new workbook
    const workbook = createWorkbook();
    const worksheet = workbook.getWorksheet('Registrations');

    if (!worksheet) {
      throw new Error('Worksheet not found');
    }

    // Add new row
    worksheet.addRow({
      ...registration,
      registrationDate: moment().format('YYYY-MM-DD HH:mm:ss')
    });

    // Convert workbook to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a blob from the buffer
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registration-${moment().format('YYYY-MM-DD')}.xlsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return { success: true, message: 'Registration saved successfully' };
  } catch (error) {
    console.error('Error saving registration:', error);
    return { success: false, message: 'Failed to save registration' };
  }
}

export const registrationService = {
  saveRegistration
}; 