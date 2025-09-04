import axios from "axios";

let cachedToken = null;
const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";

export async function getToken() {
  if (cachedToken) return cachedToken;
  try {
    const res = await axios.post(AUTH_URL, {
      email: "22nm1a05d3@view.edu.in",
      name: "ravada bhavana",
      rollNo: "22nm1a05d3",
      accessCode: "YzuJeU",
      clientID: "9e048ef7-cedb-4c01-8c26-300920ef8c97",
      clientSecret: "agvbeEcNUaCJHrnW",
    });
    cachedToken = res.data.access_token;
    console.log("✅ Token fetched successfully");
    return cachedToken;
  } catch (err) {
    console.error(
      "❌ Failed to fetch token:",
      err.response?.status,
      err.response?.data || err.message
    );
    return null;
  }
}
