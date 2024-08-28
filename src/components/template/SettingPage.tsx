import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteAccount from "../module/DeleteAccount";

async function SettingPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8 bg-gradient-to-r from-p-500 to-p-200 p-2">
      <h2 className="text-left font-medium tracking-[1px] text-white">
        Setting
      </h2>
      <div className="mx-auto w-max">
        <Image
          src="/image/setting.png"
          width={300}
          height={300}
          priority
          alt="setting-logo"
          className="size-[11rem]"
        />
      </div>
      <div className="-ml-2 rounded-br-full rounded-tr-full w-max pr-20 bg-white p-2">
        {session?.user?.email ? (
          <DeleteAccount email={session.user.email} />
        ) : null}
      </div>
    </div>
  );
}

export default SettingPage;
