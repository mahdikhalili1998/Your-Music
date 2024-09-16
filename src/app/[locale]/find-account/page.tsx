import FindAccountPage from "@/components/template/FindAccountPage";
import { IParams } from "@/types/props";

function page({ params: { locale } }: IParams) {
  return <FindAccountPage locale={locale}  />;
}

export default page;
