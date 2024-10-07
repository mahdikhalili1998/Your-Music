export function clearLocalStorage() {
  localStorage.clear();
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

export function isEnglishOnly(str) {
  return /^[A-Za-z._]+$/.test(str);
}

export const truncateText = (text, charLimit = 15) => {
  if (text.length > charLimit) {
    return "..." + text.slice(0, charLimit);
  }
  return text;
};
