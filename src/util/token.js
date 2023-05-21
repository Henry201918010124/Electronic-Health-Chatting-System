import Cookies from "js-cookie";

function getToken(tokenKey) {
  return Cookies.get(tokenKey);
}

function setToken(tokenKey, token) {
  Cookies.set(tokenKey, token);
}

function removeToken(tokenKey) {
  Cookies.remove(tokenKey);
}

function setStorage(key, value) {
  localStorage.setItem(key, value);
}

function getStorage(key) {
  return localStorage.getItem(key);
}

function removeStorage(key){
  localStorage.removeItem(key)
}

export { getToken, setToken, removeToken, setStorage, getStorage, removeStorage };
