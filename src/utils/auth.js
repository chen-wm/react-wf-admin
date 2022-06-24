export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  return localStorage.setItem("token", token);
}

export function removeToken() {
  return localStorage.removeItem("token");
}

export function getAuthToken() {
  return localStorage.getItem("authToken");
}

export function setAuthToken(token) {
  return localStorage.setItem("authToken", token);
}

export function removeAuthToken() {
  return localStorage.removeItem("authToken");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function setRefreshToken(token) {
  return localStorage.setItem("refreshToken", token);
}

export function removeRefreshToken() {
  return localStorage.removeItem("refreshToken");
}

export function getUserInfo() {
  return localStorage.getItem("userInfo");
}

export function setUserInfo(userInfo) {
  return localStorage.setItem("userInfo", userInfo);
}

export function removeUserInfo() {
  return localStorage.removeItem("userInfo");
}
export function getPermissions() {
  return localStorage.getItem("permissions");
}

export function setPermissions(permissions) {
  return localStorage.setItem("permissions", permissions);
}

export function removePermissions() {
  return localStorage.removeItem("permissions");
}
