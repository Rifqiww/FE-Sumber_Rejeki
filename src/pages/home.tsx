import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BGMain from '../assets/BG-Main.png';
import HeroImage from '../assets/hero-image.png';
import FooterImage from '../assets/hero_footer.png';
import HalalLogo from '../assets/halal-MUI.png';
import PdfDocument from '../assets/PENGUMUMAN pra UKK 2025.pdf';
import { BestsellerCarousel } from '../components/BestsellerCarousel';
import ForkSpoon from '../assets/icon/Fork-Knife--Streamline-Plump.svg';
import CoffeeMug from '../assets/icon/Coffee-Mug--Streamline-Sharp.svg';
import Cookie from '../assets/icon/Cookie-Bite--Streamline-Sharp.svg';

const Home: React.FC = () => {
  const [showPdf, setShowPdf] = useState(false);
  return (
    <div className="min-h-screen">
      {/* hero */}
      <section className="relative bg-primary text-white py-16 md:py-24 overflow-hidden min-h-screen">
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 absolute top-0 left-0"
          style={{ backgroundImage: `url(${BGMain})` }}
        >
          <div className="w-full h-full bg-primary bg-opacity-50"></div>
        </div>
        
        <div className="px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8 pl-12">
              <h1 className="text-xl font-lora md:text-2xl lg:text-3xl leading-tight mb-4">
                Temukan <span className="font-bold text-secondary">makanan atau minuman tradisional</span> yang kamu mau disini, bukan hanya tradisional tetapi juga <span className="font-bold text-secondary">menyehatkan</span>
              </h1>
              <p className="text-md font-inter italic text-white opacity-70 mb-8">
                Find the traditional food or drink you want here, not only traditional but also healthy
              </p>
              <Link 
                to="/menu"
                className="inline-flex items-center justify-center bg-secondary text-primary font-lora font-bold py-3 px-10 rounded-full text-xl border-[3px] border-quaternary">
                BELI SEKARANG
              </Link>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full h-auto">
                <img
                  src={HeroImage}
                  alt="Traditional Food and Drinks"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* bagian bestseller */}
      <section className="bg-primary py-5">
        <BestsellerCarousel />
      </section>

      {/* bagian bawah */}
      <section className="bg-primary py-5 px-20 flex gap-5">
        <div className='flex-row py-8'>
          <img src={FooterImage} alt="Footer Image" />
            <div className="flex flex-col md:flex-row items-center gap-5 rounded-2xl w-full max-w-2xl">
            <img 
              src={HalalLogo} 
              alt="Halal Logo" 
              className="w-20 h-20 object-contain"
            />
            <div className="text-center md:text-left">
              <p className="text-white font-lora text-xl mb-3">Sudah Bersertifikasi Halal</p>
              <div className="flex justify-center md:justify-start">
                <button 
                  onClick={() => setShowPdf(true)}
                  className="bg-secondary text-primary font-inter py-2 px-6 text-base rounded-xl hover:bg-opacity-90 transition-colors"
                >
                  Lihat Dokumen
                </button>
              </div>
              
              {/* pdf modal */}
              {showPdf && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fadeIn" onClick={() => setShowPdf(false)}>
                  <div className="bg-primary/95 rounded-xl shadow-2xl border-2 border-white/10 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center p-4 bg-primary/90 border-b border-white/10">
                      <h3 className="text-white text-2xl font-bold font-lora tracking-wide">Sertifikat Halal</h3>
                      <button 
                        onClick={() => setShowPdf(false)}
                        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors duration-200"
                        aria-label="Tutup"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="w-full h-[70vh] flex-grow p-1">
                      <iframe 
                        src={PdfDocument}
                        className="w-full h-full rounded-lg bg-white shadow-inner"
                        title="Sertifikat Halal"
                      />
                    </div>
                    <div className="p-3 bg-primary/90 border-t border-white/10 text-center">
                      <p className="text-white/80 text-sm">Gulir untuk melihat lebih lanjut</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col mb-10">
            <h3 className="text-[#BF8762] text-left font-cinzel font-bold text-5xl text-shadow text-shadow-x-3 text-shadow-y-3 text-shadow-[#75645A] mb-2">KATEGORI KAMI</h3>
            <div className='border-2 border-secondary rounded-r-full w-3/4'/>
          </div>
          <div className="flex-row space-y-10">
            {/* makanan tradisional */}
            <div className="flex items-center gap-5">
              <div className="bg-[#4F77A0] p-6 rounded-full mb-2">
                <img 
                  src={ForkSpoon}
                  alt="Makanan Berat" 
                  className="w-12 h-auto"
                />
              </div>
              <div className="flex flex-col w-96 gap-2">
                <h1 className="text-secondary font-lora text-4xl">Makanan Tradisional</h1>
                <p className="text-white font-inter italic text-xl">Masakan rumahan dengan cita rasa khas penuh rasa, bikin rindu kampung halaman.</p>
              </div>
            </div>
            {/* minuman tradisional */}
            <div className="flex items-center gap-5">
              <div className="bg-[#D54A23] p-6 rounded-full mb-2">
                <img 
                  src={CoffeeMug} 
                  alt="Makanan Berat" 
                  className="w-12 h-auto"
                />
              </div>
              <div className="flex flex-col w-96 gap-2">
                <h1 className="text-secondary font-lora text-4xl">Minuman Tradisional</h1>
                <p className="text-white font-inter italic text-xl">Kesegaran yang menenangkan, hadir dari racikan sederhana penuh makna.</p>
              </div>
            </div>
            {/* cemilan dan jajan */}
            <div className="flex items-center gap-5">
              <div className="bg-[#7D9E3B] p-6 rounded-full mb-2">
                <img 
                  src={Cookie}
                  alt="Makanan Berat" 
                  className="w-12 h-auto"
                />
              </div>
              <div className="flex flex-col w-96 gap-2">
                <h1 className="text-secondary font-lora text-4xl">Jajanan & Cemilan</h1>
                <p className="text-white font-inter italic text-xl">Cemilan ringan yang selalu cocok untuk menemani obrolan santai.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;