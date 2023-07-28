import axios from "axios";
import { CryptoState } from "../CryptoContext";

const baseURL = process.env.PORT || "http://localhost:5000"; // Set your base URL here

export default async function uploadData(data) {
  const url = `${baseURL}/login`;

  try {
    const response = await axios.post(url, data);

    return response;
  } catch (err) {
    return err.response;
  }
}

export async function makeuser(data) {
  const url = `${baseURL}/signup`;

  try {
    const response = await axios.post(url, data);

    return response;
  } catch (err) {
    console.log(err);
    //  return err.response.status;
  }
}

export async function buyShare(data) {
  const url = `${baseURL}/buy`;

  try {
    const response = await axios.post(url, data);

    return response;
  } catch (err) {
    if (err.response) {
      // If the server responded with an error status code
      throw new Error(`Error: Server responded with status code ${err.response.status}`);
    } else if (err.request) {
      // If the request was made but no response was received
      throw new Error("Error: No response received from the server");
    } else {
      // Other errors
      throw new Error("Error: Something went wrong with the request");
    }
  }
}

export async function watchlistdata(email) {
  const url = `${baseURL}/watchlistdata`;
  try {
    const response = await axios.post(url, { email: email });

    return response;
  } catch (err) {
    console.log(err);
    //  return err.response.status;
  }
}

export async function sellshare(object) {
  const url = `${baseURL}/sellshare`;
  try {
    const response = await axios.delete(url, { data: object });
    return response;
  } catch (err) {
    console.log(err);
    //  return err.response.status;
  }
}
