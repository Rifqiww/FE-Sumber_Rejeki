import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { motion } from "framer-motion";
import AuthHeader from "../../components/AuthHeader";
import LoginTL from "../../assets/authPage/login-TL.svg";
import LoginBR from "../../assets/authPage/login-BR.svg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
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
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password harus diisi";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Login success", formData);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3, // Add a small delay so container opens first
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
        src={LoginTL}
        alt="Decoration Top Left"
        className="absolute top-28 left-0 w-1/2 md:w-[600px] z-0 pointer-events-none"
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src={LoginBR}
        alt="Decoration Bottom Right"
        className="absolute bottom-0 right-0 w-1/3 md:w-auto z-0 pointer-events-none"
      />

      <AuthHeader />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative bg-[#E6D5B8] w-[90%] md:w-[500px] p-8 md:p-12 lg:p-20 rounded-bl-[3rem] rounded-tr-[3rem] md:rounded-bl-[5rem] md:rounded-tr-[5rem] shadow-2xl z-10 flex flex-col items-center"
      >
        <div className="relative mb-6">
          <div className="">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-wider">
              MASUK
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
            className="text-primary font-montserrat text-center text-sm md:text-lg"
          >
            Halo, Selamat kembali di website ini
          </motion.p>
          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              name="email"
              placeholder="Email atau Username"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border-2 ${
                errors.email ? "border-red-500" : "border-transparent"
              } focus:border-primary-light focus:outline-none bg-white text-secondary-dark placeholder-secondary-dark/80 transition-colors`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block pl-2 font-semibold">
                {errors.email}
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
              className={`w-full p-3 rounded-lg border-2 ${
                errors.password ? "border-red-500" : "border-transparent"
              } focus:border-primary-light focus:outline-none bg-white text-secondary-dark placeholder-secondary-dark/80 shadow-inner transition-colors`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
            className="text-sm text-center font-montserrat text-quaternary"
          >
            Belum memiliki akun?{" "}
            <Link
              to="/register"
              className="underline font-bold hover:text-primary"
            >
              Daftar Akun
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
              MASUK
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
