import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import petImage from "../assets/images/pet_image.png"; 

gsap.registerPlugin(ScrollTrigger);

function Contact({ id }) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".contact-content-container", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className="w-full bg-brand-dark-turquoise min-h-screen flex items-center py-20 px-4 scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        <div className="md:block">
          <img 
            src={petImage} 
            alt="Happy pet" 
            className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
          />
        </div>

        <div className="contact-content-container text-center md:text-left bg-black/10 p-8 rounded-2xl border border-white/10">
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-beige mb-4">
            Bize Ulaşın
          </h2>
          <p className="font-sans text-lg text-brand-beige/80 mb-10">
            Evcil dostunuz için en iyisini bulmanıza yardımcı olmaktan mutluluk duyarız. Ürünlerimiz hakkında sorularınız veya önerileriniz için bize aşağıdaki kanallardan ulaşabilirsiniz.
          </p>
          
          <div className="space-y-4">
            <a
              href="https://www.instagram.com/perenkpetshop"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:bg-brand-beige hover:scale-105 transition-all duration-300"
            >
              <FaInstagram size={28} className="text-brand-beige group-hover:text-brand-dark-turquoise transition-colors" />
              <div>
                <h3 className="font-sans font-bold text-lg text-brand-beige group-hover:text-brand-dark-turquoise transition-colors">Instagram</h3>
                <p className="font-sans text-brand-beige/70 group-hover:text-brand-dark-turquoise/80 transition-colors">@perenkpetshop</p>
              </div>
            </a>
            <a
              href="tel:+905551234567"
              className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:bg-brand-beige hover:scale-105 transition-all duration-300"
            >
              <FaPhoneAlt size={24} className="text-brand-beige group-hover:text-brand-dark-turquoise transition-colors" />
              <div>
                <h3 className="font-sans font-bold text-lg text-brand-beige group-hover:text-brand-dark-turquoise transition-colors">Telefon</h3>
                <p className="font-sans text-brand-beige/70 group-hover:text-brand-dark-turquoise/80 transition-colors">+90 555 123 45 67</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;