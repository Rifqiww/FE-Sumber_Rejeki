import { Link } from "react-router-dom";
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import LogOutIcon from "../assets/icon/logout-03.svg";
import { initialUserProfile } from "../data/userProfile";

const ProfileNav = () => {
  return (
    <div className="h-full justify-between flex flex-col p-4">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-3 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-pacifico text-white mb-6">Profile</h1>
          <img
            src={initialUserProfile.profileImage}
            alt="User Profile"
            className="w-36 h-auto rounded-full mb-4"
          />
        </div>
        <nav className="px-2.5">
          <ul className="text-white font-lora text-2xl space-y-2.5">
            <li>
              <Link to="/profile" className="flex items-center justify-start">
                <UserRound
                  className="mr-2 bg-quaternary/40 rounded-sm p-1"
                  color="#E6D5B8"
                  size={30}
                />
                Akun Saya
              </Link>
            </li>
            <li>
              <Link to="/likes" className="flex items-center justify-start">
                <Heart
                  className="mr-2 fill-red-500 bg-red-500/20 rounded-sm p-1"
                  size={30}
                  color=""
                />
                Suka
              </Link>
            </li>
            <li>
              <Link to="/orders" className="flex items-center justify-start">
                <ShoppingCart
                  className="mr-2 fill-white bg-white/20 rounded-sm p-1"
                  size={30}
                  color="#ffffff"
                />
                Pesanan Saya
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex justify-center items-center">
        <button className="text-secondary underline flex items-center justify-center">
          <img src={LogOutIcon} alt="Log Out" className="mr-2" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default ProfileNav;
