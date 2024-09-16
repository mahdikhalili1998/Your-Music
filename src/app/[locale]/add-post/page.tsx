import AddPostPage from "@/components/template/AddPostPage";
import { IParams } from "@/types/props";

function page({ params: { locale } }: IParams) {
  return <AddPostPage locale={locale} />;
}

export default page;
