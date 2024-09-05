// components/LanguageSwitcher.js
"use client";

import { useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (newLocale) => {
    router.push(`/${newLocale}${router.asPath}`);
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => changeLanguage("en")}
        className={`mr-2 px-4 py-2 ${locale === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("fa")}
        className={`px-4 py-2 ${locale === "fa" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        فارسی
      </button>
    </div>
  );
};

export default LanguageSwitcher;
