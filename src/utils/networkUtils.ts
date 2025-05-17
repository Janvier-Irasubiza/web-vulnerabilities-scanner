import axios, { Method } from "axios";

export async function sendRequest(
  url: string,
  method: Method = "GET",
  data?: any,
  headers?: any
) {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
    });
    return response;
  } catch (error) {
    console.error(`Error sending request to ${url}:`, error);
    throw error;
  }
}

export function handleResponse(response: any) {
  if (response && response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Unexpected response status: ${response.status}`);
  }
}
