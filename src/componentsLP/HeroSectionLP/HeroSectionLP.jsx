// src/components/HeroSection/HeroSection.jsx
import React, { useEffect } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './HeroSection.css';

// Importe a imagem da pasta assets
import bolaAzulImage from '../../assets/images/bola-azul.png'; 

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  useEffect(() => {
    const heroContent = document.querySelector('.hero-content-inner');
    const heroImageContainer = document.querySelector('.hero-image-container'); // Target container for image animation
    const graphicElements = document.querySelectorAll('.graphic-element');

    // Delay for a smoother entry animation sequence
    setTimeout(() => {
      if (heroContent) {
        heroContent.classList.add('animate-in');
      }
      if (heroImageContainer) {
        heroImageContainer.classList.add('animate-in');
      }
      graphicElements.forEach((el, index) => {
        setTimeout(() => el.classList.add('animate-in'), index * 150); // Stagger graphic elements
      });
    }, 100); // Small delay to ensure CSS is ready
  }, []);

  return (
    <div className="hero-section-wrapper">
      {/* Elementos gráficos sutis */}
      <div className="graphic-element shape1"></div>
      <div className="graphic-element shape2"></div>
      <div className="graphic-element shape3"></div>

      <Row align="middle" justify="center" className="hero-section-row">
        <Col
          xs={22}
          sm={20}
          md={11}
          lg={10}
          xl={9}
          className="hero-content-col"
        >
          <div className="hero-content-inner">
            <Title level={1} className="hero-title">
              Inovação e Humanidade: O Futuro é Agora com IA.
            </Title>
            <Paragraph className="hero-subtitle">
              Potencializamos seu negócio com Inteligência Artificial que entende
              pessoas e impulsiona resultados extraordinários.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              className="hero-cta-button"
              icon={<ArrowRightOutlined />}
              href="#solucoes" // Exemplo de link para uma seção
            >
              Explore Nossas Soluções
            </Button>
          </div>
        </Col>
        <Col
          xs={20}
          sm={18}
          md={11}
          lg={10}
          xl={9}
          className="hero-image-col"
        >
          <div className="hero-image-container">
            <img 
              src={bolaAzulImage} // Use a imagem importada
              alt="Ilustração abstrata de inteligência artificial" 
              className="hero-image" 
            />
            <div className="image-backdrop-glow"></div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeroSection;