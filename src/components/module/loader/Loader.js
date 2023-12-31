import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <ThreeDots
      color="#DFAE76"
      height={45}
      ariaLabel="three-dots-loading"
      visible={true}
      wrapperStyle={{ margin: "auto" }}
    />
  );
}

export default Loader;
