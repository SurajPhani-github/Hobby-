const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

// Ensure the data directory exists
const DATA_DIR = path.join(__dirname, '../../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const EXCEL_FILE = path.join(DATA_DIR, 'registrations.xlsx');

async function ensureWorkbook() {
  if (!fs.existsSync(EXCEL_FILE)) {
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
      { header: 'Experience', key: 'experience', width: 15 },
      { header: 'Motivation', key: 'motivation', width: 50 },
      { header: 'Challenge ID', key: 'challengeId', width: 15 },
      { header: 'Challenge Title', key: 'challengeTitle', width: 30 },
      { header: 'Domain ID', key: 'domainId', width: 15 }
    ];

    // Style the header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    await workbook.xlsx.writeFile(EXCEL_FILE);
  }
}

async function handleRegistration(registration) {
  try {
    await ensureWorkbook();
    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE);
    const worksheet = workbook.getWorksheet('Registrations');

    // Add new registration
    worksheet.addRow({
      ticketNumber: registration.ticketNumber,
      registrationDate: moment(registration.registrationDate).format('YYYY-MM-DD HH:mm:ss'),
      name: registration.name,
      email: registration.email,
      username: registration.username,
      portfolio: registration.portfolio,
      experience: registration.experience,
      motivation: registration.motivation,
      challengeId: registration.challengeId,
      challengeTitle: registration.challengeTitle,
      domainId: registration.domainId
    });

    // Save the workbook
    await workbook.xlsx.writeFile(EXCEL_FILE);

    return {
      success: true,
      message: 'Registration saved successfully'
    };
  } catch (error) {
    console.error('Error saving registration to Excel:', error);
    throw error;
  }
}

module.exports = {
  handleRegistration
}; 