import { useEffect, useState } from "react";
import axios from "axios";


// export const API_BASE_URL = 'https://api.realmigo.tech';
export const API_BASE_URL = 'http://127.0.0.1:8000';


// Fetching expenses categories
export function fetchExpenseCategories(): Promise<string[]> {
  const apiBaseURL = API_BASE_URL;
  const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  return axios
    .get<string[]>(`${apiBaseURL}/api/v1/expense-categories/`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching expense categories:", error);
      return [];
    });
}

let expenseCategoriesCache: string[] | null = null;

export async function getExpenseCategories(): Promise<string[]> {
  if (!expenseCategoriesCache) {
    expenseCategoriesCache = await fetchExpenseCategories();
  }
  return expenseCategoriesCache;
}

// Fetching expenses categories
// export function fetchExpenseCategories(): Promise<string[]> {
//   const apiBaseURL = API_BASE_URL;
//   const authToken =
//     localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

//   return axios
//     .get<string[]>(`${apiBaseURL}/api/v1/expense-categories/`, {
//       headers: {
//         Authorization: `Token ${authToken}`,
//       },
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Error fetching expense categories:", error);
//       return [];
//     });
// }

// export function useExpenseCategories(): string[] {
//   const [expenseCategories, setExpenseCategories] = useState<string[]>([]);

//   useEffect(() => {
//     fetchExpenseCategories().then((expenseCategories) => {
//       setExpenseCategories(expenseCategories);
//     });
//   }, []);

//   return expenseCategories;
// }


// Fetching Income categories
export function fetchIncomeCategories(): Promise<string[]> {
  const apiBaseURL = API_BASE_URL;
  const authToken =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  return axios
    .get<string[]>(`${apiBaseURL}/api/v1/income-categories/`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching incoming categories:", error);
      return [];
    });
}


export function useIncomeCategories(): string[] {
  const [incomeCategories, setIncomeCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchExpenseCategories().then((incomeCategories) => {
      setIncomeCategories(incomeCategories);
    });
  }, []);

  return incomeCategories;
}


// Return formatted date

export function formatCurrentDatetime(): string {
  const currentDatetime = new Date();
  const year = currentDatetime.getFullYear();
  const month = (currentDatetime.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDatetime.getDate().toString().padStart(2, '0');
  const hours = currentDatetime.getHours().toString().padStart(2, '0');
  const minutes = currentDatetime.getMinutes().toString().padStart(2, '0');
  const seconds = currentDatetime.getSeconds().toString().padStart(2, '0');
  const milliseconds = currentDatetime.getMilliseconds().toString().padStart(3, '0');
  const timezoneOffsetMinutes = currentDatetime.getTimezoneOffset();
  const timezoneOffsetHours = Math.abs(timezoneOffsetMinutes) / 60;
  const timezoneOffsetSign = timezoneOffsetMinutes >= 0 ? '-' : '+';

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffsetSign}${timezoneOffsetHours.toString().padStart(2, '0')}:${(Math.abs(timezoneOffsetMinutes) % 60).toString().padStart(2, '0')}`;
}


// Usage
// const formattedDatetime = formatCurrentDatetime();
// console.log(formattedDatetime);
