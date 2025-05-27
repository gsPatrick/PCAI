// src/components/Footer/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, Space, Divider, Button } from 'antd'; // Importar Button
import {
    // InstagramOutlined, // Removido
    LinkedinFilled,
    // YoutubeFilled, // Removido
    MailOutlined,
    WhatsAppOutlined,
    HeartFilled,
    RightOutlined, 

} from '@ant-design/icons';
import './Footer.css';

import logoBranca from '../../assets/images/logoBranca.png';
import backgroundAzul from '../../assets/images/backgroundAzul.png'; // Já importado

const { Title, Paragraph, Text, Link: AntLink } = Typography;

// Modificado para representar botões
const contactButtons = [
    { key: 'email', text: "Enviar E-mail", href: "mailto:contato@peoplechangeai.com", icon: <MailOutlined /> },
    { key: 'whatsapp', text: "Fale via WhatsApp", href: "https://wa.me/SEUNUMEROWHATSAPP", icon: <WhatsAppOutlined /> } // TODO: Substituir SEUNUMEROWHATSAPP
];


const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialIconsRef = useRef(null);
  const navLinksTitleRef = useRef(null);
  const contactTitleRef = useRef(null);
  const creditsRef = useRef(null);
  const copyrightRef = useRef(null);
  const dividerRef = useRef(null);
  
  // Ajustar o slice para o número correto de links de navegação (mantido 5)
  const navLinkItemRefs = useRef(Array(5).fill(null).map(() => React.createRef()));
  // Ajustar o slice para o número correto de botões de contato (2)
  const contactButtonRefs = useRef(Array(contactButtons.length).fill(null).map(() => React.createRef()));

  useEffect(() => {
    const currentFooterRef = footerRef.current;

    const elementsToObserve = [
        logoRef.current, descriptionRef.current, socialIconsRef.current,
        navLinksTitleRef.current, ...navLinkItemRefs.current.map(ref => ref.current).filter(Boolean),
        contactTitleRef.current, ...contactButtonRefs.current.map(ref => ref.current).filter(Boolean),
        creditsRef.current, copyrightRef.current, dividerRef.current
    ].filter(Boolean);


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('footer-element-visible');
            const delay = parseFloat(entry.target.dataset.delay || '0'); // Obter delay individual
            // Use o índice para adicionar um pequeno stagger *dentro* do grupo, se quiser
            // const groupStagger = entry.target.closest('.footer-col-enhanced, .footer-divider-wrapper, .footer-credits-row-enhanced, .footer-copyright-row-enhanced');
            // let addedDelay = 0;
            // if(groupStagger) {
            //     // Lógica mais complexa para calcular o delay com base no grupo e no item
            // }
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


    // Cleanup function
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


  const currentYear = new Date().getFullYear();
  const navLinks = [
      { href: "#hero-section", text: "Início" }, // Ajustado para id da seção Hero
      { href: "#section-quem-somos", text: "Quem Somos" }, // Exemplo de ID
      { href: "#section-solucoes", text: "Soluções" }, // Exemplo de ID
      { href: "#section-beneficios", text: "Benefícios" }, // Exemplo de ID
      { href: "#section-contato", text: "Contato" }, // Exemplo de ID
  ];
  // Removido contactItems - usando contactButtons

  return (
    <footer
      ref={footerRef}
      className="footer-wrapper enhanced"
      style={{ backgroundImage: `url(${backgroundAzul})` }}
    >
      {/* Removido o div do overlay */}
      {/* <div className="footer-overlay-enhanced"></div> */}
      <div className="footer-graphic-pattern"></div>

      <div className="footer-content-area-enhanced">
        <Row gutter={[40, 56]} justify="space-between" className="footer-main-row-enhanced">
          <Col xs={24} sm={24} md={10} lg={8} className="footer-col-enhanced">
            <a href="/#hero-section" ref={logoRef} className="footer-logo-link anim-target" data-delay="0.1">
              <img src={logoBranca} alt="People Change AI Consulting - Voltar ao topo" className="footer-logo-enhanced"/>
            </a>
            <Paragraph ref={descriptionRef} className="footer-description-enhanced anim-target" data-delay="0.2">
              Transformando o futuro dos negócios com Inteligência Artificial humanizada,
              focada em resultados e no potencial das pessoas.
            </Paragraph>
            <Space ref={socialIconsRef} size="large" className="footer-social-icons-enhanced anim-target" data-delay="0.3">
              {/* Mantido apenas o LinkedIn */}
              <AntLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><LinkedinFilled /></AntLink>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6} lg={7} className="footer-col-enhanced">
            <Title ref={navLinksTitleRef} level={5} className="footer-col-title-enhanced anim-target" data-delay="0.25">Navegação</Title>
            <ul className="footer-link-list-enhanced">
              {navLinks.map((link, index) => (
                <li key={link.href} ref={navLinkItemRefs.current[index]} className="anim-target" data-delay={0.3 + index * 0.08}> {/* Delay por item da lista */}
                  <AntLink href={link.href}><RightOutlined className="link-arrow"/> {link.text}</AntLink>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={24} sm={12} md={8} lg={7} className="footer-col-enhanced">
            <Title ref={contactTitleRef} level={5} className="footer-col-title-enhanced anim-target" data-delay="0.3">Entre em Contato</Title>
            <div className="footer-contact-buttons"> {/* Novo container para os botões */}
                {contactButtons.map((item, index) => (
                     <Button
                        key={item.key}
                        ref={contactButtonRefs.current[index]}
                        className="footer-contact-button anim-target"
                        data-delay={0.35 + index * 0.1} // Delay por botão
                        type="primary" // AntD primary style base
                        icon={item.icon}
                        href={item.href}
                        target={item.href.startsWith('http') ? "_blank" : undefined}
                     >
                        {item.text}
                     </Button>
                ))}
            </div>
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