import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import { HiMenu, HiX } from "react-icons/hi";
import logoF from "../assets/images/logo.png"; 

function Navbar({ onLinkSetActive }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation("global");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyles = "font-sans text-brand-beige hover:text-white font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer";

  const closeMenuAndScroll = (target) => {
    setIsMobileMenuOpen(false);
    onLinkSetActive(target);
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center pt-4">

      {/* --- The Floating Pill --- */}
      {/* The `w-auto` was changed to be responsive */}
      <div className="flex items-center justify-between w-11/12 md:w-auto py-2 px-4 bg-brand-dark-turquoise/80 backdrop-blur-xl shadow-lg rounded-full border border-white/10">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="home" spy={true} smooth={true} duration={500} onSetActive={() => onLinkSetActive('home')} className="flex items-center cursor-pointer">
            <div className="bg-brand-beige rounded-full p-1 shadow-sm flex items-center justify-center">
              <img src={logoF} alt="Perenk Petshop Logo" className="h-12 w-auto" />
            </div>
          </Link>
        </div>

        {/* Desktop Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 px-4">
          <Link to="about" spy={true} smooth={true} offset={-70} duration={500} className={linkStyles} onSetActive={() => onLinkSetActive('about')}>
            {t("Hakkımızda")}
          </Link>
          <Link to="products" spy={true} smooth={true} offset={-70} duration={500} className={linkStyles} onSetActive={() => onLinkSetActive('products')}>
            {t("Ürünlerimiz")}
          </Link>
          <Link to="stories" spy={true} smooth={true} offset={-70} duration={500} className={linkStyles} onSetActive={() => onLinkSetActive('stories')}>
            {t("Hikayeler")}
          </Link>
          <Link to="contact" spy={true} smooth={true} offset={-70} duration={500} className={linkStyles} onSetActive={() => onLinkSetActive('contact')}>
            {t("İletişim")}
          </Link>
        </div>

        {/* Hamburger Menu Button (Visible on mobile only) */}
        <div className="md:hidden flex-shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-beige p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU PANEL --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 w-11/12 bg-brand-dark-turquoise/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10">
          <div className="flex flex-col items-center gap-2 p-4">
            <Link onClick={() => closeMenuAndScroll('about')} to="about" spy={true} smooth={true} offset={-70} duration={500} className="w-full text-center py-3 rounded-lg hover:bg-white/10 font-sans text-brand-beige font-bold transition-all duration-300">
              {t("Hakkımızda")}
            </Link>
            <Link onClick={() => closeMenuAndScroll('products')} to="products" spy={true} smooth={true} offset={-70} duration={500} className="w-full text-center py-3 rounded-lg hover:bg-white/10 font-sans text-brand-beige font-bold transition-all duration-300">
              {t("Ürünlerimiz")}
            </Link>
            <Link onClick={() => closeMenuAndScroll('contact')} to="contact" spy={true} smooth={true} offset={-70} duration={500} className="w-full text-center py-3 rounded-lg hover:bg-white/10 font-sans text-brand-beige font-bold transition-all duration-300">
              {t("İletişim")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;