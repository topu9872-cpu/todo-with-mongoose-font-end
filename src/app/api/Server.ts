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

export const postData = async (endpoint: string, createData: unknown) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createData),
    });
    if (!response) throw new Error("failed to fatch post data");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateData = async (endpoint: string, createData: unknown) => {
  try {
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

export const deleteData = async (endpoint: string, id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
      method: "DELETE",
    });
    if (!response) throw new Error("failed to fetch delete data");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
