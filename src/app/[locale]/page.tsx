import HomePage from "@/components/template/HomePage";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="px-2">
      <p>{t("Profile")}</p>
      <HomePage />
    </div>
  );
}
