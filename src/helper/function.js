export function clearAllCookies(cookiesToDelete) {
  cookiesToDelete.forEach((cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname.split(".").slice(1).join(".")}`;
  });
  console.log("Specified cookies have been cleared.");
}

export function clearLocalStorage() {
  // پاک کردن تمام داده‌های localStorage
  localStorage.clear();

  console.log("All localStorage data has been cleared.");
}
