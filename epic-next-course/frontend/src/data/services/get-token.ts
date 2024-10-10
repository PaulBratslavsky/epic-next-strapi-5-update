import { cookies } from "next/headers";

export async function getAuthToken() {
  const authToken = cookies().get("jwt")?.value;
  console.log("##########################");
  console.log(authToken, "authToken");
  console.log("##########################");
  return authToken;
}