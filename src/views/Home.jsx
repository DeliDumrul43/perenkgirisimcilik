// src/views/Home.jsx

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Leading from './Leading';
import About from './About';
import ProductPage from './ProductPage';
import Footer from './Footer';
import Contact from './Contact';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';

const pageInfoData = {
  home: {
    title: "Perenk Petshop - Ankara'un Kaliteli Evcil Hayvan Ürünleri",
    description: "Perenk Petshop, evcil hayvanlarınız için en kaliteli mama, oyuncak ve aksesuarları sunar."
  },
  about: {
    title: "Hakkımızda - Perenk Petshop",
    description: "Perenk Petshop'un hikayesini, misyonumuzu ve hayvan sevgisi dolu değerlerimizi keşfedin."
  },
  products: {
    title: "Ürünlerimiz - Perenk Petshop",
    description: "Perenk Petshop'un evcil hayvanlarınız için özenle seçilmiş, kaliteli ve sağlıklı ürünlerini keşfedin."
  },
  contact: {
    title: "İletişim - Perenk Petshop",
    description: "Bize ulaşın. Sorularınız ve siparişleriniz için telefon ve Instagram adresimiz."
  }
};

function Home() {
  const [pageInfo, setPageInfo] = useState(pageInfoData.home);

  const handleSetActive = (sectionName) => {
    if (pageInfoData[sectionName]) {
      setPageInfo(pageInfoData[sectionName]);
    }
  };
  
  return (
    <>
      <Helmet>
          <title>{pageInfo.title}</title>
          <meta name="description" content={pageInfo.description} />
      </Helmet>

      <Navbar onLinkSetActive={handleSetActive} />    
      
      <Leading id="home" />
      <About id="about" />
      <ProductPage id="products" />
      <Contact id="contact" />
      <Footer />
    </>

  );
}

export default Home;