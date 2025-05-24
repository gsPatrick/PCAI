// src/pages/LandingPage/LandingPage.jsx
import React from 'react';
import { Layout, Typography, Row, Col, Image } from 'antd';
import AppHeader from '../../componentsLP/HeaderLP/HeaderLP.jsx'; // Importe o Header
import HeroSection from '../../componentsLP/HeroSectionLP/HeroSectionLP.jsx'; // Importe a HeroSection
import ProductVideoSection from '../../componentsLP/ProductVideoSection/ProductVideoSection.jsx'; // Importe a seção de vídeo do produto
import PillarsSection from '../../componentsLP/PillarsSection/PillarsSection.jsx';
import DifferentiatorsSection from '../../componentsLP/DifferentiatorsSection/DifferentiatorsSection.jsx';
import SolutionsOverviewSection from '../../componentsLP/SolutionsOverviewSection/SolutionsOverviewSection.jsx';
import AboutIntroSection from '../../componentsLP/AboutIntroSection/AboutIntroSection.jsx';
import TeamSection from '../../componentsLP/TeamSection/TeamSection.jsx';
import ExpectedBenefitsSection from '../../componentsLP/ExpectedBenefitsSection/ExpectedBenefitsSection.jsx';
import ContactSection from '../../componentsLP/ContactSection/ContactSection.jsx';
import EthicalCommitmentSection from '../../componentsLP/EthicalCommitmentSection/EthicalCommitmentSection.JSX';
import Footer from '../../componentsLP/Footer/Footer.jsx';

import './LandingPage.css';

const logoUrl = '/logo.png';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const LandingPage = () => {
  return (
    <Layout className="landing-page">
      <AppHeader /> {/* Renderize o Header aqui */}

      {/* Seção 1: Hero com Logo e Slogan */}
      {/* Certifique-se que esta seção tenha um ID para o link do logo no header */}
      <Content id="hero-section" className="hero-section section">
        <HeroSection />
        <ProductVideoSection />
        <PillarsSection />
        <DifferentiatorsSection />
        <SolutionsOverviewSection />
        <AboutIntroSection />
        <TeamSection />
        <ExpectedBenefitsSection />
        <ContactSection />
        <EthicalCommitmentSection />

      </Content>

        {/* Seção 2: Footer */}
        <Content id="footer-section" className="footer-section">
            <Footer />
        </Content>  

      {/* 
        Para que os links do menu funcionem, suas seções precisam ter IDs correspondentes:
        Exemplo:
        <Content id="section-quem-somos" className="quem-somos-section section">
          ... conteúdo de Quem Somos ...
        </Content>
        <Content id="section-solucoes" className="solucoes-section section">
          ... conteúdo de Soluções ...
        </Content>
        etc.
      */}

    </Layout>
  );
};

export default LandingPage;