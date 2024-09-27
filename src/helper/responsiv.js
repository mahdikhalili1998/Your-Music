export const checkWindowSize = (setOpenPersonalModal,setOpenLoginModal) => {
  // مقدار عرض صفحه از sm در Tailwind معادل با 640px است
  const mediaQuery = window.matchMedia("(min-width: 640px)");

  if (mediaQuery.matches) {
    // اگر عرض صفحه از sm بزرگتر باشد، مقدار openPersonalModal را روی true تنظیم می‌کنیم
    setOpenPersonalModal(true);
    setOpenLoginModal(true);
  }
};
