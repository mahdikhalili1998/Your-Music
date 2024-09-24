function isPersian(text) {
  const persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(text);
}

export default isPersian;
