import { User } from '../types';

export const saveUsersToCSV = (users: User[]) => {
  const headers = ['ID', 'Name', 'Email', 'Department', 'Year', 'Roll Number', 'Registration Date'];
  const csvContent = [
    headers.join(','),
    ...users.map(user => [
      user.id,
      user.name,
      user.email,
      user.department || '',
      user.year || '',
      user.rollNo || '',
      new Date().toISOString()
    ].join(','))
  ].join('\n');

  // Create a Blob and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const loadUsersFromCSV = (csvContent: string): User[] => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const users: User[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length === headers.length) {
      users.push({
        id: values[0],
        name: values[1],
        email: values[2],
        department: values[3] || undefined,
        year: values[4] || undefined,
        rollNo: values[5] || undefined,
        avatar_url: undefined
      });
    }
  }

  return users;
}; 