export function clearLocalStorage() {
  // پاک کردن تمام داده‌های localStorage
  localStorage.clear();

  console.log("All localStorage data has been cleared.");
}

export function isLengthValid(str) {
  return str.length >= 8;
}

export function hasUpperCase(str) {
  return /[A-Z]/.test(str);
}

export function hasNumber(str) {
  return /\d/.test(str);
}

export function hasSpecialCharacter(str) {
  return /[!@#$%^&*(),.?":{}|<>]/.test(str);
}
