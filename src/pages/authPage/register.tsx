import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { motion } from "framer-motion";
import AuthHeader from "../../components/AuthHeader";
import RegisterTR from "../../assets/authPage/register-TR.svg";
import RegisterBL from "../../assets/authPage/register-BL.svg";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { email: "", username: "", phone: "", password: "" };
    let isValid = true;

    if (!formData.email.trim()) newErrors.email = "Email harus diisi";
    if (!formData.username.trim()) newErrors.username = "Username harus diisi";
    if (!formData.phone.trim()) newErrors.phone = "Nomor Telepon harus diisi";
    if (!formData.password.trim()) newErrors.password = "Password harus diisi";

    if (
      newErrors.email ||
      newErrors.username ||
      newErrors.phone ||
      newErrors.password
    ) {
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Register success", formData);
    }
  };

  const inputClassName = (hasError: boolean) =>
    `w-full p-3 rounded-lg border-2 ${
      hasError ? "border-red-500" : "border-transparent"
    } focus:border-primary-light focus:outline-none bg-white text-secondary-dark placeholder-secondary-dark/80 transition-colors`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative min-h-screen w-full bg-primary overflow-hidden flex flex-col items-center justify-center font-inter">
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src={RegisterBL}
        alt="Decoration Bottom Left"
        className="absolute bottom-[-300px] left-[-200px] w-1/3 md:w-1/2 z-0 pointer-events-none"
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src={RegisterTR}
        alt="Decoration Top Right"
        className="absolute top-0 right-[-200px] w-1/3 md:w-1/2 z-0 pointer-events-none"
      />

      <AuthHeader />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative bg-tertiary-dark w-[90%] md:w-[500px] p-6 md:p-12 lg:p-20 rounded-bl-[3rem] rounded-tr-[3rem] md:rounded-bl-[5rem] md:rounded-tr-[5rem] shadow-2xl z-10 flex flex-col items-center mt-20 md:mt-20"
      >
        <div className="relative mb-6">
          <div className="">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-wider">
              DAFTAR
            </h2>
          </div>
        </div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 items-start"
        >
          <motion.p
            variants={itemVariants}
            className="text-primary font-montserrat text-center w-full text-sm md:text-lg"
          >
            Halo, Selamat datang di website kami
          </motion.p>

          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={inputClassName(!!errors.email)}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block pl-2 font-semibold">
                {errors.email}
              </span>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={inputClassName(!!errors.username)}
            />
            {errors.username && (
              <span className="text-red-500 text-xs mt-1 block pl-2 font-semibold">
                {errors.username}
              </span>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              name="phone"
              placeholder="Nomor Telepon"
              value={formData.phone}
              onChange={handleChange}
              className={inputClassName(!!errors.phone)}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs mt-1 block pl-2 font-semibold">
                {errors.phone}
              </span>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`${inputClassName(!!errors.password)} shadow-inner`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
            >
              {showPassword ? (
                <EyeClosed color="#BF8762" />
              ) : (
                <Eye color="#BF8762" />
              )}
            </button>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 block pl-2 font-semibold">
                {errors.password}
              </span>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-sm font-montserrat text-quaternary w-full"
          >
            Sudah memiliki Akun?{" "}
            <Link
              to="/login"
              className="underline font-bold hover:text-primary"
            >
              Masuk Akun
            </Link>{" "}
            disini
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <button
              type="submit"
              className="mt-4 bg-secondary hover:bg-secondary-dark text-primary font-lora py-2 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 border border-primary/20"
            >
              DAFTAR
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
