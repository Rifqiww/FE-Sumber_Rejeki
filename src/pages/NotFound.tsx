import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-white mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Pastikan URL yang
          Anda masukkan sudah benar.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-secondary text-primary rounded-lg hover:bg-secondary-dark transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
