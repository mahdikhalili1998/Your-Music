export function clearLocalStorage() {
  // پاک کردن تمام داده‌های localStorage
  localStorage.clear();

  console.log("All localStorage data has been cleared.");
}

export function isLengthValid(str) {
  return str.length >= 8;
}

