import { Link } from "react-router-dom";
import { CgScreen } from "react-icons/cg";
import { IoWalletOutline, IoLogOutOutline } from "react-icons/io5";
import { BsBuildingGear } from "react-icons/bs";



const OwnerHome = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-5 max-w-[420px] flex-wrap justify-center items-center">
        <OptionCard url="front-desk" title="Front Office" Icon={CgScreen} />
        <OptionCard url="owner/dashboard" title="Managment" Icon={BsBuildingGear} />
        <OptionCard url="sub-details" title="Subscription" Icon={IoWalletOutline} />
        <OptionCard url="logout" title="Logout" Icon={IoLogOutOutline} />
      </div>
    </div>
  );
};

const OptionCard = ({ url, title, Icon }) => {
  return (
    <Link
      to={`/${url}`}
      className="w-[180px] h-[180px] bg-white p-5 flex flex-col gap-5 justify-center items-center border border-[#ddd] rounded-xl"
    >
      <Icon  size={48} />
      <p className="text-xl font-medium">{title}</p>
    </Link>
  );
};

export default OwnerHome;
