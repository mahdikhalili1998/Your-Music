const regexInfo = {
  name: /^[a-zA-Zآ-ی]{1,20}$/,
  lastName: /^(?!\d+$)(?!.*-)[A-Za-z\u0600-\u06FF\d_]{4,}$/,
  userName: /^[A-Za-z][A-Za-z0-9_]{3,19}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^1234$/,
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phoneNumber: /^09\d{9}$/,
  creditCard: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/, //با جداساز هم مطابقت دارد
};

export { regexInfo };
