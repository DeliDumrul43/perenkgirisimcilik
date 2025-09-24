import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-brand-beige py-6 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-sans text-sm text-brand-dark-turquoise/60">
          &copy; {new Date().getFullYear()} Perenk Petshop. Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
}

export default Footer;