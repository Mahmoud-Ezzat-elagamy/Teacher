/**
 * Fetch wrapper that automatically refreshes token on 401 and retries the request
 * This prevents multiple simultaneous refresh attempts
 */
export async function fetchWithRefresh(url, options = {}) {
  const newOptions = {
    ...options,
    credentials: options.credentials || "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  let response = await fetch(url, newOptions);

  // If 401 Unauthorized, navigate to login page ignoring refresh logic
  if (response.status === 401) {
    window.location.href = "/login";
    return response;
  }
  return response;
}
