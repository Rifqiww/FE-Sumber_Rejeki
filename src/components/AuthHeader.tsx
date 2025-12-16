import { Link } from "react-router-dom";
import Logo from "../assets/LOGO.png";

const AuthHeader = () => {
  return (
    <div className="w-full flex items-center justify-between pb-8 p-5 px-8 mx-auto z-20 absolute top-0">
      <div className="flex items-center">
        <img src={Logo} alt="Sumber Rejeki Logo" className="w-16 h-auto" />
        <h1 className="ml-3 text-2xl font-pacifico text-white">
          Sumber Rejeki
        </h1>
      </div>

      <Link
        to="/"
        className="bg-secondary hover:bg-secondary-dark text-primary font-bold font-lora py-2 px-3 rounded-xl transition-colors shadow-md"
      >
        Kembali
      </Link>
    </div>
  );
};

export default AuthHeader;
