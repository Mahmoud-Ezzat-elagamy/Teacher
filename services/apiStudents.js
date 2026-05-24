import { API_BASE_URL } from "./consts";
import { fetchWithRefresh } from "./fetchWithRefresh";

export async function getStudentsApi(
  pageSize = 10,
  pageNumber = 1,
  searchString = "",
) {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (!token) {
    window.location.href = "/login";
    throw new Error("No authentication token found");
  }

  const myURL = `${API_BASE_URL}/api/Users?PageSize=${pageSize}&PageNumber=${pageNumber}&SearchString=${searchString}`;
  const res = await fetchWithRefresh(myURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("getStudentsApi errors:", res.errors);
  }

  const data = await res.json();
  console.log("getStudentsApi response data:", data);
  return data.items || [];
}
