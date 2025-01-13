import { cookies } from "next/headers";

export async function refreshToken() {
  const cookiesStore = cookies();
  let access_token = cookiesStore.get("access_token")?.value ?? "";
  const refresh_token = cookiesStore.get("refresh_token")?.value ?? "";
  // Split the JWT token into parts
  if (access_token) {
    const [, payload] = access_token.split(".");

    // Decode the payload from base64
    const decodedPayload = JSON.parse(atob(payload));
    if (decodedPayload.exp * 1000 < Date.now()) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/refresh-tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok ${response.statusText}`
            );
          }
          return response.json(); // Parse JSON data from the response
        })
        .then((data) => {
          cookiesStore.set("access_token", data.result.tokens.access.token);
          cookiesStore.set("refresh_token", data.result.tokens.refresh.token);
          access_token = data.result.tokens.access.token;
        });
    } else {
      return access_token;
    }
  }
  return access_token; // Token is still valid
}
