import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { FaPaw, FaHeart } from "react-icons/fa";
import aboutImage from "../assets/images/logo.png";


gsap.registerPlugin(ScrollTrigger);

function About({ id }) {
  const { t } = useTranslation("global");
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "restart pause restart reset",
      },
    });

    tl.from(imageRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.9,
      duration: 1.2,
      ease: "power3.out",
    });

    tl.from(".about-text-reveal", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
    }, "-=0.8");

  }, { scope: sectionRef });

  return (
    <>
      
      <section 
        id={id}
        ref={sectionRef}
        className="w-full min-h-screen paw-background py-20 px-4 flex items-center" 
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* --- LEFT COLUMN: STORY & TEXT --- */}
          <div className="text-left">
            <p className="about-text-reveal font-sans text-lg font-bold text-brand-dark-turquoise mb-3">
              {t("about.title", "Biz Kimiz?")}
            </p>
            <h2 className="about-text-reveal font-serif text-4xl md:text-5xl font-bold text-brand-dark-turquoise mb-6">
              {t("about.heading", "Her Patinin Bir Hikayesi Vardır")}
            </h2>
            <p className="about-text-reveal font-sans text-base text-gray-700 mb-8 leading-relaxed">
              {t("about.description", "Perenk Petshop, bir fikirden doğdu: Her evcil hayvan, en iyi bakımı ve sevgiyi hak eder. İstanbul'un kalbinde, hayvansever bir ekip olarak, dostlarınız için en kaliteli, sağlıklı ve eğlenceli ürünleri bir araya getirmek için yola çıktık.")}
            </p>
            <div className="space-y-6">
              <div className="about-text-reveal flex items-start gap-4">
                <div className="text-brand-dark-turquoise mt-1"><FaPaw size={24} /></div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-dark-turquoise">{t("about.missionTitle", "Misyonumuz")}</h3>
                  <p className="font-sans text-gray-700">{t("about.missionText", "Evcil hayvanların yaşam kalitesini artırmak ve hayvan sahiplerine güvenilir bir dost olmak.")}</p>
                </div>
              </div>
              <div className="about-text-reveal flex items-start gap-4">
                <div className="text-brand-dark-turquoise mt-1"><FaHeart size={24} /></div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-dark-turquoise">{t("about.valuesTitle", "Değerlerimiz")}</h3>
                  <p className="font-sans text-gray-700">{t("about.valuesText", "Sevgi, kalite ve güven. Her ürünümüzü kendi dostlarımıza sunacakmış gibi özenle seçiyoruz.")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: IMAGE --- */}
          <div className="flex items-center justify-center">
            <img
              ref={imageRef}
              src={aboutImage}
              alt={t("about.imageAlt", "Perenk Petshop Logosu")}
              className="rounded-2xl w-full max-w-md shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default About;