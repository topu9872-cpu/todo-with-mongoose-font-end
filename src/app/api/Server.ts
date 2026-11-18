import type { Task } from "@/src/types/Tasks";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
   if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postData = async (endpoint: string, createData: Task) => {
const response = await fetch(`${BASE_URL}${endpoint}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(createData),
});

const responseData = await response.json();

if (!response.ok) {
  console.error("Backend Validation Error:", responseData);
  throw new Error(JSON.stringify(responseData));
}

return responseData;
};

export const updateData = async (endpoint: string, createData: Task) => {
  try {
    console.log(endpoint, createData)
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createData),
    });
    if (!response) throw new Error("failed to fetch update data");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    console.log(endpoint)
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    if (!response) throw new Error("failed to fetch delete data");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
