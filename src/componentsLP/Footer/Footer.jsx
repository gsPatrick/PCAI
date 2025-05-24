// src/components/Footer/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, Space, Divider } from 'antd';
import { 
    InstagramOutlined, 
    LinkedinFilled, 
    YoutubeFilled,
    MailOutlined,
    WhatsAppOutlined,
    HeartFilled,
    RightOutlined 
} from '@ant-design/icons';
import './Footer.css';

import logoBranca from '../../assets/images/logoBranca.png';
import backgroundAzul from '../../assets/images/backgroundAzul.png';

const { Title, Paragraph, Text, Link: AntLink } = Typography; // Renomeado Link para AntLink para evitar conflito

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialIconsRef = useRef(null);
  const navLinksTitleRef = useRef(null);
  const navLinkItemRefs = useRef([]);
  const contactTitleRef = useRef(null);
  const contactItemRefs = useRef([]);
  const creditsRef = useRef(null);
  const copyrightRef = useRef(null);
  const dividerRef = useRef(null);


  useEffect(() => {
    const currentFooterRef = footerRef.current;
    navLinkItemRefs.current = navLinkItemRefs.current.slice(0, 5); 
    contactItemRefs.current = contactItemRefs.current.slice(0, 2); 

    const elementsToObserve = [
        logoRef.current, descriptionRef.current, socialIconsRef.current,
        navLinksTitleRef.current, ...navLinkItemRefs.current.filter(Boolean),
        contactTitleRef.current, ...contactItemRefs.current.filter(Boolean),
        creditsRef.current, copyrightRef.current, dividerRef.current
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('footer-element-visible');
            const delay = parseFloat(entry.target.dataset.delay || '0') + (index * 0.05); 
            entry.target.style.transitionDelay = `${delay}s`;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 } 
    );

    elementsToObserve.forEach(el => {
        if(el) observer.observe(el); // Adicionada verificação se el existe
    });
    
    const sectionObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting){
            currentFooterRef.classList.add('footer-container-visible');
            sectionObserver.unobserve(currentFooterRef);
        }
    }, {threshold: 0.01});
    if(currentFooterRef) sectionObserver.observe(currentFooterRef);

    return () => {
      elementsToObserve.forEach(el => {
          if(el) observer.unobserve(el);
      });
      if(currentFooterRef && sectionObserver) sectionObserver.unobserve(currentFooterRef);
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const navLinks = [
      { href: "#hero", text: "Início" }, // Assumindo que a Hero Section tem id="hero"
      { href: "#about", text: "Quem Somos" },
      { href: "#solutions", text: "Soluções" },
      { href: "#benefits", text: "Benefícios" },
      { href: "#contact", text: "Contato" },
  ];
  const contactItems = [
      { icon: <MailOutlined />, text: "contato@peoplechangeai.com", href: "mailto:contato@peoplechangeai.com"},
      { icon: <WhatsAppOutlined />, text: "WhatsApp Suporte", href: "https://wa.me/SEUNUMEROWHATSAPP"}
  ];

  return (
    <footer 
      ref={footerRef} 
      className="footer-wrapper enhanced" 
      style={{ backgroundImage: `url(${backgroundAzul})` }}
    >
      <div className="footer-overlay-enhanced"></div>
      <div className="footer-graphic-pattern"></div>

      <div className="footer-content-area-enhanced">
        <Row gutter={[40, 56]} justify="space-between" className="footer-main-row-enhanced">
          <Col xs={24} sm={24} md={10} lg={8} className="footer-col-enhanced">
            {/* LOGO AGORA É UM LINK PARA O TOPO */}
            <a href="/#hero" ref={logoRef} className="footer-logo-link anim-target" data-delay="0.1">
              <img src={logoBranca} alt="People Change AI Consulting - Voltar ao topo" className="footer-logo-enhanced"/>
            </a>
            <Paragraph ref={descriptionRef} className="footer-description-enhanced anim-target" data-delay="0.2">
              Transformando o futuro dos negócios com Inteligência Artificial humanizada, 
              focada em resultados e no potencial das pessoas.
            </Paragraph>
            <Space ref={socialIconsRef} size="large" className="footer-social-icons-enhanced anim-target" data-delay="0.3">
              <AntLink href="https://instagram.com" target="_blank" aria-label="Instagram"><InstagramOutlined /></AntLink>
              <AntLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><LinkedinFilled /></AntLink>
              <AntLink href="https://youtube.com" target="_blank" aria-label="YouTube"><YoutubeFilled /></AntLink>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6} lg={7} className="footer-col-enhanced">
            <Title ref={navLinksTitleRef} level={5} className="footer-col-title-enhanced anim-target" data-delay="0.25">Navegação</Title>
            <ul className="footer-link-list-enhanced">
              {navLinks.map((link, index) => (
                <li key={index} ref={el => navLinkItemRefs.current[index] = el} className="anim-target" data-delay={0.3 + index * 0.08}>
                  <AntLink href={link.href}><RightOutlined className="link-arrow"/> {link.text}</AntLink>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={24} sm={12} md={8} lg={7} className="footer-col-enhanced">
            <Title ref={contactTitleRef} level={5} className="footer-col-title-enhanced anim-target" data-delay="0.3">Entre em Contato</Title>
            {contactItems.map((item, index) => (
                 <Paragraph key={index} ref={el => contactItemRefs.current[index] = el} className="footer-contact-item-enhanced anim-target" data-delay={0.35 + index * 0.08}>
                    {item.icon} <AntLink href={item.href} target={item.href.startsWith('http') ? "_blank" : undefined}>{item.text}</AntLink>
                 </Paragraph>
            ))}
          </Col>
        </Row>

        <div ref={dividerRef} className="footer-divider-wrapper anim-target" data-delay="0.6">
            <Divider className="footer-divider-enhanced" />
        </div>
        
        <Row ref={creditsRef} justify="center" align="middle" className="footer-credits-row-enhanced anim-target" data-delay="0.7">
            <Col>
                <Paragraph className="footer-credits-text-enhanced">
                    Orgulhosamente construído com IA e paixão humana. <br className="mobile-break"/>
                    Desenvolvido com <HeartFilled className="heart-icon" /> por 
                    {/* LINK DO DESENVOLVEDOR */}
                    <a href="https://codebypatrick.dev" target="_blank" rel="noopener noreferrer" className="patrick-developer-link">
                         Patrick.Developer
                    </a>
                </Paragraph>
            </Col>
        </Row>
        
        <Row ref={copyrightRef} justify="center" className="footer-copyright-row-enhanced anim-target" data-delay="0.8">
          <Col>
            <Text className="footer-copyright-text-enhanced">
              © {currentYear} People Change AI Consulting. Todos os direitos reservados.
            </Text>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;