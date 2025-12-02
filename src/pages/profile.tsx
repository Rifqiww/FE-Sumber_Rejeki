import { useState, useRef, type ChangeEvent } from "react";
import ProfileNav from "../components/profileNav";
import { Link } from "react-router-dom";
import { UserRound, Mail, User, Lock, Phone, Camera } from "lucide-react";
import {
  initialUserProfile,
  type UserProfile,
  saveProfile,
  updateProfileImage,
} from "../data/userProfile";

const Profile = () => {
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Hanya format JPG, JPEG, atau PNG yang diizinkan");
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      alert("Ukuran file maksimal 1MB");
      return;
    }

    try {
      const imageUrl = await updateProfileImage(file);
      setUser((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
      setPreviewImage(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Gagal mengunggah gambar");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(user);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUser(initialUserProfile);
    setIsEditing(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="bg-primary min-h-screen flex mt-32">
      <div className="w-1/5">
        <ProfileNav />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="bg-quaternary/40 p-2 rounded-md mr-4">
            <UserRound size={40} color="#E6D5B8" />
          </div>
          <h1 className="text-white font-lora text-4xl">AKUN SAYA</h1>
        </div>

        <div className="flex gap-8">
          {/* Left Column - Form */}
          <div className="w-1/2">
            <div className="mb-6">
              <label
                className="block text-white font-lora text-lg mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary-dark"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full bg-[#2E1A12] border border-tertiary-dark rounded-md py-3 pl-10 pr-4 text-white placeholder-tertiary-dark/50 focus:outline-none focus:ring-2 focus:ring-tertiary-dark ${
                    !isEditing ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-white font-lora text-lg mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary-dark"
                  size={20}
                />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full bg-[#2E1A12] border border-tertiary-dark rounded-md py-3 pl-10 pr-4 text-white placeholder-tertiary-dark/50 focus:outline-none focus:ring-2 focus:ring-tertiary-dark ${
                    !isEditing ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-lora text-lg mb-2">
                Password
              </label>
              <Link
                to="/update-password"
                className="w-full flex items-center justify-center bg-tertiary-dark hover:bg-[#D4C0A1] text-[#2E1A12] font-lora font-bold py-3 px-4 rounded-md transition duration-300"
              >
                <Lock className="mr-2 text-[#2E1A12]" size={20} />
                UBAH PASSWORD
              </Link>
            </div>

            <div className="mb-8">
              <label
                className="block text-white font-lora text-lg mb-2"
                htmlFor="phone"
              >
                Nomor Telepon
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary-dark"
                  size={20}
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full bg-[#2E1A12] border border-tertiary-dark rounded-md py-3 pl-10 pr-4 text-white placeholder-tertiary-dark/50 focus:outline-none focus:ring-2 focus:ring-tertiary-dark ${
                    !isEditing ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>

            <div className="flex gap-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="bg-tertiary-dark hover:bg-[#D4C0A1] text-[#2E1A12] font-lora font-bold py-3 px-8 rounded-md transition duration-300"
                >
                  EDIT PROFIL
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-tertiary-dark hover:bg-[#D4C0A1] text-[#2E1A12] font-lora font-bold py-3 px-8 rounded-md transition duration-300"
                  >
                    SIMPAN
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-lora font-bold py-3 px-8 rounded-md transition duration-300"
                  >
                    BATAL
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Profile Picture */}
          <div className="w-1/2 flex flex-col items-center">
            <div className="relative group">
              <div className="w-64 h-64 bg-[#2E1A12] rounded-full flex items-center justify-center mb-4 overflow-hidden">
                {user.profileImage || previewImage ? (
                  <img
                    src={previewImage || user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserRound size={120} color="#E6D5B8" />
                )}
              </div>
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={triggerFileInput}
                    className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    title="Ubah foto profil"
                  >
                    <Camera size={24} />
                  </button>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
              disabled={!isEditing}
            />
            <button
              type="button"
              onClick={triggerFileInput}
              disabled={!isEditing}
              className={`bg-tertiary-dark hover:bg-[#D4C0A1] text-[#2E1A12] font-lora font-bold py-2 px-6 rounded-md mb-2 transition duration-300 ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Pilih Gambar
            </button>
            <p className="text-tertiary-dark text-sm text-center">
              Ukuran gambar: Maks 1 MB
              <br />
              Format: JPG, JPEG, PNG
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
