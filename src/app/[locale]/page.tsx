import HomePage from "@/components/template/HomePage";
import { IParams } from "@/types/props";

export default function Home({ params: { locale } }: IParams) {
  return (
    <div className="px-2">
      <HomePage locale={locale} />
    </div>
  );
}
