import jwtDecode from "jwt-decode";

export const tokens = {
  access: {
    set: (token: string) => localStorage.setItem("accessToken", token),
    get: () => localStorage.getItem("accessToken"),
    delete: () => localStorage.removeItem("accessToken"),
  },

  refresh: {
    set: (token: string) => localStorage.setItem("refreshToken", token),
    get: () => localStorage.getItem("refreshToken"),
    delete: () => localStorage.removeItem("refreshToken"),
  },
};

/*
// Is this more readable than what we have now? (tokens object)
// This way we have more control about what is exported,
// But it is maybe more messy
// Either way, uncomment or delete before it gets into dev

const setAccessToken = (token: string) =>
  localStorage.setItem("accessToken", token);
const setRefreshToken = (token: string) =>
  localStorage.setItem("refreshToken", token);

const deleteAccessToken = () => localStorage.removeItem("accessToken");
const deleteRefreshToken = () => localStorage.removeItem("refreshToken");

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
*/

// Client-side token verification

// This is not the best solution
// I couldn't find a way to elegentally perform passive token
// refresh (server sends 401, refresh token, try again) with useFetch

// We can maybe switch to react-query, but for now this will do

interface Token {
  userId: string;
  iat: number;
  exp: number;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

/** Returns the access token. Performs a token refresh if necessary */
export const acquireToken = async () => {
  const accessToken = tokens.access.get();
  if (!accessToken) {
    return null;
  }

  const decoded = jwtDecode(accessToken) as Token;
  // If the token has not expired yet, just return it
  if (Date.now() < decoded.exp * 1000) {
    return accessToken;
  }

  // accessToken is expired, need to refresh
  tokens.access.delete();
  const refreshToken = tokens.refresh.get();
  if (!refreshToken) {
    // No refresh token (somehow), so just return null
    return null;
  }

  // Refresh the tokens
  // TODO: Rotem, where is the url stored?
  const API_URL = "http://localhost:4000";
  const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${refreshToken}`,
    },
  });

  // Refresh failed
  if (!refreshResponse.ok) {
    if (refreshResponse.status.toString().startsWith("4")) {
      // Refresh token is invalid
      tokens.refresh.delete();
    }
    return null;
  }

  // Refresh success!
  const newTokens: Tokens = await refreshResponse.json();
  tokens.access.set(newTokens.accessToken);
  tokens.refresh.set(newTokens.refreshToken);

  return newTokens.accessToken;
};
