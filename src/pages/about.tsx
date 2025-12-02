import React, { useEffect } from "react";
import chibiSoewarni from "../assets/aboutPage/chibi-soewarni.png";
import Image2 from "../assets/aboutPage/gambar-2.png";
import Image3 from "../assets/aboutPage/gambar-3.png";
import BgAbout from "../assets/bg-about.jpg";

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full font-sans">
      {/* header */}
      <section className="bg-[#3E1801] text-white py-20 px-6 md:px-16 text-center mt-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url(${BgAbout})`,
          }}
        ></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-lora mb-12 relative inline-block">
            Tentang Sumber Rezeki
            <div className="border-b border-4 rounded-full border-white w-1/2 mx-auto mt-4"></div>
          </h1>

          <div className="space-y-6 text-lg font-inter leading-relaxed opacity-90">
            <p>
              Kami hadir dengan misi kuat untuk melestarikan dan menyajikan
              warisan kuliner tradisional yang otentik. Tujuan kami adalah
              menghadirkan kembali nostalgia dan pengalaman rasa yang jujur dari
              tanah Jawa melalui setiap produk kami.
            </p>
            <p>
              Kami menjamin kualitas tertinggi setiap produk olahan kami dengan
              mempertahankan resep tradisional dan menggunakan bahan-bahan lokal
              pilihan.
            </p>
            <p>
              Cita rasa aslinya tetap terjaga sempurna tanpa kompromi. Kami
              adalah jembatan yang membawa kelezatan masa lalu ke hadapan Anda,
              kini tersedia dengan mudah secara online.
            </p>
          </div>
        </div>
      </section>

      {/* mid */}
      <section className="bg-[#F4C466] py-5 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <img
            src={chibiSoewarni}
            alt="chibiSoewarni"
            className="md:w-1/2 h-[800px] object-contain"
          />

          <div className="w-full md:w-1/2 text-[#3E1801]">
            <h2 className="text-4xl font-bold font-lora mb-1">Soewarni</h2>
            <p className="text-lg italic mb-8 font-inter">
              Founder Sumber Rezeki
            </p>

            <div className="space-y-6 font-inter leading-relaxed">
              <p>
                lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum
                dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit
                ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem
                ipsum dolor sit amet
              </p>
              <p>
                lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum
                dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit
                ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem
                ipsum dolor sit amet
              </p>
              <p>
                lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum
                dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit
                ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem
                ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor
                sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit
                ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem
                ipsum dolor sit ametlorem ipsum dolor sit amet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* visi */}
      <section className="bg-[#3E1801] text-white py-10 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 text-right order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold font-lora mb-8 uppercase tracking-wider">
              Visi Sumber Rezeki
            </h2>
            <p className="text-xl font-inter leading-relaxed max-w-md ml-auto">
              Membuat makanan tradisional menjadi lebih dikenal semua genereasi
            </p>
          </div>

          <img
            src={Image2}
            alt="image 2"
            className="w-full md:w-1/2 bg-gray-300 rounded-sm shadow-lg order-1 md:order-2"
          />
        </div>
      </section>

      {/* misi */}
      <section className="bg-[#3E1801] text-white px-6 md:px-16 pb-32">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <img
            src={Image3}
            alt="image 3"
            className="w-full md:w-1/2 aspect-video bg-gray-300 rounded-sm shadow-lg"
          />

          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-3xl md:text-4xl font-bold font-lora mb-8 uppercase tracking-wider">
              Misi Sumber Rezeki
            </h2>
            <p className="text-xl font-inter leading-relaxed max-w-md">
              Memperkenalkan makanan dan minuman tradisional yang dapat
              dijadikan sebagai gaya hidup masyarakat luas
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
