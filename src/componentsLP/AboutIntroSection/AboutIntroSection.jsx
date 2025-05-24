// src/components/AboutIntroSection/AboutIntroSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography } from 'antd';
import './AboutIntroSection.css';

import bgAzul from '../../assets/images/backgroundAzul.png';
import bolaBrancaImg from '../../assets/images/bola-branca.png';

const { Title, Paragraph, Text } = Typography;

const AboutIntroSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const organicImageRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const targetsToObserve = [contentRef.current, organicImageRef.current].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-item-in-view');
          }
        });
      },
      { threshold: 0.1 } // Reduzido para a animação de entrada da imagem começar um pouco antes
    );

    targetsToObserve.forEach(target => {
      if (target) observer.observe(target);
    });
    
    const handleScroll = () => {
      if (organicImageRef.current && currentSectionRef.classList.contains('section-active-intro')) {
        const sectionRect = currentSectionRef.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calcula o progresso de scroll dentro da seção (0 quando o topo da seção atinge o topo da viewport, 1 quando o fundo sai)
        // No entanto, para um efeito de parallax simples, vamos usar a posição relativa ao viewport.
        const scrollYRelativeToViewportTop = sectionRect.top;

        // Queremos que o parallax seja mais suave e não tão extremo
        const parallaxIntensity = 0.1; // Ajuste este valor
        let parallaxOffset = -scrollYRelativeToViewportTop * parallaxIntensity;
        
        // Limitar o offset para evitar movimentos muito grandes
        const maxParallax = 60; // Limite máximo de deslocamento do parallax
        parallaxOffset = Math.max(-maxParallax, Math.min(maxParallax, parallaxOffset));

        // A animação 'organicImageFloat' já cuida da rotação e escala base.
        // O JS aqui só adiciona o translateY do parallax.
        organicImageRef.current.style.setProperty('--parallax-offset-y', `${parallaxOffset}px`);
      }
    };
    
    let sectionEntryObserver;
    if (currentSectionRef) {
        sectionEntryObserver = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
              currentSectionRef.classList.add('section-active-intro');
              window.addEventListener('scroll', handleScroll, { passive: true });
              sectionEntryObserver.unobserve(currentSectionRef);
          }
        }, { threshold: 0.01 });
        
        sectionEntryObserver.observe(currentSectionRef);
    }

    return () => {
      targetsToObserve.forEach(target => {
        if (target) observer.unobserve(target);
      });
      if (sectionEntryObserver && currentSectionRef) {
          sectionEntryObserver.unobserve(currentSectionRef);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="about-intro-section-wrapper" 
      style={{ backgroundImage: `url(${bgAzul})` }}
    >
      <div className="about-intro-overlay"></div>
      
      <div className="about-intro-content-area">
        <Row gutter={[64, 48]} align="middle" className="about-intro-row"> {/* Gutter horizontal maior */}
          <Col xs={24} lg={13} xl={12} className="about-text-column"> {/* Coluna de texto um pouco mais estreita em telas grandes */}
            <div ref={contentRef} className="text-content-block animation-target-intro">
              <Title level={4} className="section-tagline-about">Quem somos</Title>
              <Paragraph className="main-paragraph-about">
                A <strong className="company-name-highlight">People Change AI Consulting</strong> nasceu para
                redefinir a relação entre tecnologia e humanidade.
              </Paragraph>
              <Paragraph className="secondary-paragraph-about">
                Não inovamos por inovar: criamos soluções que ampliam
                o talento, protegem a dignidade e potenciam o
                crescimento humano nas organizações.
              </Paragraph>
              <Paragraph className="emphasis-paragraph-about">
                Tecnologia ao serviço das pessoas. <span className="emphasis-always">Sempre.</span>
              </Paragraph>
            </div>
          </Col>

          <Col xs={24} lg={11} xl={12} className="about-shape-column"> {/* Coluna da imagem ganha mais espaço */}
            <div ref={organicImageRef} className="organic-image-wrapper animation-target-intro">
              <img 
                src={bolaBrancaImg} 
                alt="Forma orgânica da People Change AI" 
                className="organic-image-element"
              />
            </div>
          </Col>
        </Row>
        
        <Row className="about-footer-row animation-target-intro">
          <Col>
            <Text className="about-footer-brand-text">PEOPLE CHANGE AI CONSULTING</Text>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutIntroSection;