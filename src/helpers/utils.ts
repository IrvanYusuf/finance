import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(localizedFormat);

export const dateFormatFromUTC = (dateString: Date) => {
  return dayjs.utc(dateString).local().format('DD MMMM YYYY');
};

export const currencyFormat = (amount: number, options: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat('id-Id', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    ...options,
  }).format(amount);
};

export const numberFormat = (number: number, notation: 'standard' | 'compact' = 'standard') =>
  new Intl.NumberFormat('en-US', {
    notation,
  }).format(number);

export const maskAccountNumber = (accountNumber: string) => {
  const last2 = accountNumber && accountNumber.slice(-2);
  return '**** **** **' + last2;
};

// export const truncateText = (text: string, maxLength: number) => {
//   if (text.length > maxLength) {
//     return text.substring(0, maxLength) + '...';
//   }
//   return text;
// };
export function truncateText(text: string | undefined, maxLength: number): string {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export const tokenManager = (() => {
  return {
    getAccessToken: () => {
      try {
        const token = localStorage.getItem('token');
        return token;
      } catch (error) {
        console.log(error);
        throw new Error('Gagal ambil token');
      }
    },
    setToken: (token: string) => {
      localStorage.setItem('token', token);
    },
    removeToken: () => {
      localStorage.removeItem('token');
    },
  };
})();
