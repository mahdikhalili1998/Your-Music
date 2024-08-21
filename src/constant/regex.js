const regexInfo = {
  name: /^[A-Za-z\u0600-\u06FF]{4,}$/,
  userName: /^[A-Za-z][A-Za-z0-9_]{3,19}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^1234$/,
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phoneNumber: /^09\d{9}$/,
};

export { regexInfo };
