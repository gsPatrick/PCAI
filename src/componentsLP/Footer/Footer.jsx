// src/componentsLP/Footer/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, Space, Divider } from 'antd'; // Button removido
import {
    LinkedinFilled,
    // MailOutlined, // Removido se não houver botões de contato
    // WhatsAppOutlined, // Removido
    // HeartFilled, // Removido pois estava nos créditos do dev
    // RightOutlined, // Removido
} from '@ant-design/icons';
import './Footer.css';

import logoBranca from '../../assets/images/logoBranca.png';
import backgroundAzul from '../../assets/images/backgroundAzul.png';

const { Paragraph, Text, Link: AntLink } = Typography; // Title removido

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const socialIconWrapperRef = useRef(null);
  // creditsRef removido, pois a seção foi removida
  const copyrightRef = useRef(null);
  const dividerRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const currentFooterRef = footerRef.current;

    const elementsToObserve = [
        logoRef.current,
        descriptionRef.current,
        socialIconWrapperRef.current,
        dividerRef.current,
        copyrightRef.current // Mantém copyright
    ].filter(Boolean);


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { // Removido 'index' não utilizado
          if (entry.isIntersecting) {
            entry.target.classList.add('footer-element-visible');
            const delay = parseFloat(entry.target.dataset.delay || '0');
            entry.target.style.transitionDelay = `${delay}s`;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    elementsToObserve.forEach(el => {
        if(el) observer.observe(el);
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting){
            currentFooterRef.classList.add('footer-container-visible');
            sectionObserver.unobserve(currentFooterRef);
        }
    }, {threshold: 0.01});
    if(currentFooterRef) sectionObserver.observe(currentFooterRef);


    return () => {
      if (sectionObserver && currentFooterRef) {
        sectionObserver.unobserve(currentFooterRef);
      }
      if (observer) {
        elementsToObserve.forEach(el => {
            if(el) observer.unobserve(el);
        });
      }
    };
  }, []);

  const currentYear = 2025;

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="footer-wrapper enhanced"
      style={{ backgroundImage: `url(${backgroundAzul})` }}
    >
      <div className="footer-graphic-pattern"></div>

      <div className="footer-content-area-enhanced">
        <Row gutter={[40, 0]} justify="center" className="footer-main-row-enhanced">
          <Col xs={24} sm={24} md={18} lg={16} xl={14} className="footer-col-enhanced">
            <a href="/#hero-section" ref={logoRef} className="footer-logo-link anim-target" data-delay="0.1">
              <img src={logoBranca} alt="People Change AI Consulting - Voltar ao topo" className="footer-logo-enhanced"/>
            </a>
            <Paragraph ref={descriptionRef} className="footer-description-enhanced anim-target" data-delay="0.2">
              Transformando o futuro dos negócios com Inteligência Artificial humanizada,
              focada em resultados e no potencial das pessoas.
            </Paragraph>
            <div ref={socialIconWrapperRef} className="footer-social-icon-wrapper anim-target" data-delay="0.3">
              <AntLink href="https://linkedin.com/company/people-change-ai-consulting" target="_blank" aria-label="LinkedIn"><LinkedinFilled /></AntLink>
            </div>
          </Col>
        </Row>

        <div ref={dividerRef} className="footer-divider-wrapper anim-target" data-delay="0.4">
            <Divider className="footer-divider-enhanced" />
        </div>

        {/* ÁREA DE CRÉDITOS REMOVIDA */}
        {/*
        <Row ref={creditsRef} justify="center" align="middle" className="footer-credits-row-enhanced anim-target" data-delay="0.5">
            <Col>
                <Paragraph className="footer-credits-text-enhanced">
                     Desenvolvido com <HeartFilled className="heart-icon" /> por <br className="mobile-break-dev"/>
                    <a href="https://codebypatrick.dev" target="_blank" rel="noopener noreferrer" className="patrick-developer-link">
                         Patrick.Developer
                    </a>
                </Paragraph>
            </Col>
        </Row>
        */}

        <Row ref={copyrightRef} justify="center" className="footer-copyright-row-enhanced anim-target" data-delay="0.5"> {/* Delay ajustado */}
          <Col>
            <Text className="footer-copyright-text-enhanced">
              © {currentYear} People Change AI Consulting.
            </Text>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;