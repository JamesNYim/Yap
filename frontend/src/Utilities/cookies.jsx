const DAYS_TO_EXPIRE = 7;

export function setCookie(name, value) {
    const expires = new Date(Date.now() + DAYS_TO_EXPIRE * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function deleteCookie(name) {
    const expires = new Date(Date.now() - DAYS_TO_EXPIRE).toUTCString();
    document.cookie = `${name}=; expires=${expires}; path=/`;
}
