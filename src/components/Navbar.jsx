import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import { HiChevronDown } from "react-icons/hi";
import logoF from "../assets/images/logo.png"; 

function Navbar({ onLinkSetActive }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation("global");
  // const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || "tr");

  // const languages = {
  //   en: { name: "English", flag: "🇬🇧" },
  //   tr: { name: "Turkish", flag: "🇹🇷" },
  // };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const changeLanguage = (lang) => {
  //   setSelectedLanguage(lang);
  //   i18n.changeLanguage(lang);
  //   setIsLanguageOpen(false);
  // };

  const linkStyles = "font-sans text-brand-beige hover:text-white font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer";

  return (
    <nav className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-500 ease-in-out ${
        isScrolled ? 'pt-2' : 'pt-4'
      }`}
    >
      <div
        className={`
          flex items-center justify-between gap-8 pl-4 pr-6 py-2 
          bg-brand-dark-turquoise/80 backdrop-blur-xl shadow-lg rounded-full
          border border-white/10 transition-all duration-500 ease-in-out
          ${isScrolled ? 'max-w-4xl' : 'max-w-3xl'}
        `}
      >
        {/* --- MODIFICATION START --- */}
        {/* 1. Left Section (Logo with Background) */}
        <div className="flex-shrink-0">
          <a href="#" className="flex items-center">
            {/* This new div creates the circular background */}
            <div className="bg-brand-beige rounded-full p-1 shadow-sm flex items-center justify-center">
              <img src={logoF} alt="Perenk Petshop Logo" className="h-16 w-auto" />
            </div>
          </a>
        </div>
        {/* --- MODIFICATION END --- */}

        {/* 2. Center Section (Navigation Links) */}
       <div className="hidden md:flex items-center gap-8">
          <Link to="about" spy={true} smooth={true} offset={-70} duration={500} className={linkStyles} onSetActive={() => onLinkSetActive('about')}>
            {t("Hakkımızda")}
          </Link>
          <Link to="products" spy={true} smooth={true} offset={-70} duration={500} className={linkStyles} onSetActive={() => onLinkSetActive('products')}>
            {t("Ürünlerimiz")}
          </Link>
          <Link to="contact" spy={true} smooth={true} offset={50} duration={500} className={linkStyles} onSetActive={() => onLinkSetActive('contact')}>
            {t("İletişim")}
          </Link>
        </div>

        {/* <div className="relative flex-shrink-0">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center gap-2 text-brand-beige rounded-full p-2 transition-colors duration-300 hover:bg-white/10"
          >
            <span className="text-xl">{languages[selectedLanguage].flag}</span>
            <span className="hidden sm:inline font-sans font-bold text-sm">{languages[selectedLanguage].name}</span>
            <HiChevronDown className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLanguageOpen && (
             <div className="absolute top-full right-0 mt-2 w-48 bg-brand-dark-turquoise border border-white/10 rounded-xl shadow-2xl overflow-hidden">
             {Object.keys(languages).map((lang) => (
               <button
                 key={lang}
                 onClick={() => changeLanguage(lang)}
                 className="flex items-center gap-3 w-full px-4 py-2 text-left text-brand-beige hover:bg-brand-light-turquoise hover:text-brand-dark-turquoise transition-colors font-sans"
               >
                 <span className="text-xl">{languages[lang].flag}</span>
                 <span className="font-bold">{languages[lang].name}</span>
               </button>
             ))}
           </div>
          )}
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;