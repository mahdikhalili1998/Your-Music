import { ILoader } from "@/types/signIn";
import { FC } from "react";
import { Bars } from "react-loader-spinner";

const Loader: FC<ILoader> = ({ height = 40, width = 80 }) => {
  return (
    <div>
      <Bars
        height={height}
        width={width}
        color="#7e22ce"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
