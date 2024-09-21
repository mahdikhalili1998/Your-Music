import { ILoader } from "@/types/signIn";
import { FC } from "react";
import { Bars } from "react-loader-spinner";

const Loader: FC<ILoader> = ({
  height = 40,
  width = 80,
  color = "#7e22ce",
}) => {
  return (
    <div>
      <Bars
        height={height}
        width={width}
        color={color}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;

// #7e22ce
