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

// Modificado para representar botões - REMOVIDO, pois a seção de contato com botões foi removida
// const contactButtons = [
//     { key: 'email', text: "Enviar E-mail", href: "mailto:contato@peoplechangeai.com", icon: <MailOutlined /> },
//     { key: 'whatsapp', text: "Fale via WhatsApp", href: "https://wa.me/SEUNUMEROWHATSAPP", icon: <WhatsAppOutlined /> } // TODO: Substituir SEUNUMEROWHATSAPP
// ];


const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  // Removido ref para o Space
  // const socialIconsRef = useRef(null);
  // Ref para o novo div wrapper do ícone social
  const socialIconWrapperRef = useRef(null);

  // Removidos refs para Navegação e Contato, pois as seções foram removidas
  // const navLinksTitleRef = useRef(null);
  // const contactTitleRef = useRef(null);
  const creditsRef = useRef(null);
  const copyrightRef = useRef(null);
  const dividerRef = useRef(null);
  const descriptionRef = useRef(null);

  // Ajustar o slice para o número correto de links de navegação (mantido 5) - REMOVIDO
  // const navLinkItemRefs = useRef(Array(5).fill(null).map(() => React.createRef()));
  // Ajustar o slice para o número correto de botões de contato (2) - REMOVIDO
  // const contactButtonRefs = useRef(Array(contactButtons.length).fill(null).map(() => React.createRef()));

  useEffect(() => {
    const currentFooterRef = footerRef.current;

    // Atualizar a lista de elementos a serem observados
    const elementsToObserve = [
        logoRef.current,
        descriptionRef.current,
        socialIconWrapperRef.current, // Usa o novo ref
        // navLinksTitleRef.current, ...navLinkItemRefs.current.map(ref => ref.current).filter(Boolean), // REMOVIDOS
        // contactTitleRef.current, ...contactButtonRefs.current.map(ref => ref.current).filter(Boolean), // REMOVIDOS
        dividerRef.current, // Adiciona o divisor
        creditsRef.current, // Mantém créditos
        copyrightRef.current // Mantém copyright
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


  // Corrigido o ano para 2025 conforme solicitado
  const currentYear = 2025; // Alterado para 2025
  // Removido navLinks e contactItems


  return (
    <footer
      id="footer" // Adicionado ID para possível linkagem futura, embora não esteja no header
      ref={footerRef}
      className="footer-wrapper enhanced"
      style={{ backgroundImage: `url(${backgroundAzul})` }}
    >
      {/* Removido o div do overlay */}
      {/* <div className="footer-overlay-enhanced"></div> */}
      <div className="footer-graphic-pattern"></div>

      <div className="footer-content-area-enhanced">
        {/* Apenas a coluna principal com logo, descrição e social icons */}
        <Row gutter={[40, 0]} justify="center" className="footer-main-row-enhanced"> {/* Gutter horizontal e centralizado */}
          <Col xs={24} sm={24} md={18} lg={16} xl={14} className="footer-col-enhanced"> {/* Coluna maior para centralizar o conteúdo */}
            <a href="/#hero-section" ref={logoRef} className="footer-logo-link anim-target" data-delay="0.1">
              <img src={logoBranca} alt="People Change AI Consulting - Voltar ao topo" className="footer-logo-enhanced"/>
            </a>
            <Paragraph ref={descriptionRef} className="footer-description-enhanced anim-target" data-delay="0.2">
              Transformando o futuro dos negócios com Inteligência Artificial humanizada,
              focada em resultados e no potencial das pessoas.
            </Paragraph>
            {/* Substituído Space por div para melhor controle da centralização com 1 item */}
            <div ref={socialIconWrapperRef} className="footer-social-icon-wrapper anim-target" data-delay="0.3">
              <AntLink href="https://linkedin.com/company/people-change-ai-consulting" target="_blank" aria-label="LinkedIn"><LinkedinFilled /></AntLink> {/* Exemplo de link real */}
            </div>
          </Col>

          {/* REMOVIDAS COLUNAS DE NAVEGAÇÃO E CONTATO */}
          {/* <Col xs={24} sm={12} md={6} lg={7} className="footer-col-enhanced"> ... </Col> */}
          {/* <Col xs={24} sm={12} md={8} lg={7} className="footer-col-enhanced"> ... </Col> */}

        </Row>

        <div ref={dividerRef} className="footer-divider-wrapper anim-target" data-delay="0.4"> {/* Ajustado delay */}
            <Divider className="footer-divider-enhanced" />
        </div>

        {/* ÁREA DE CRÉDITOS - Removida a frase "Orgulhosamente..." e adicionada quebra de linha */}
        <Row ref={creditsRef} justify="center" align="middle" className="footer-credits-row-enhanced anim-target" data-delay="0.5"> {/* Ajustado delay */}
            <Col>
                 {/* Adicionada quebra de linha <br /> antes do link do desenvolvedor */}
                <Paragraph className="footer-credits-text-enhanced">
                     Desenvolvido com <HeartFilled className="heart-icon" /> por <br className="mobile-break-dev"/> {/* Adicionada quebra de linha específica */}
                    <a href="https://codebypatrick.dev" target="_blank" rel="noopener noreferrer" className="patrick-developer-link">
                         Patrick.Developer
                    </a>
                </Paragraph>
            </Col>
        </Row>

        {/* ÁREA DE COPYRIGHT - Atualizada com o ano e texto solicitado */}
        <Row ref={copyrightRef} justify="center" className="footer-copyright-row-enhanced anim-target" data-delay="0.6"> {/* Ajustado delay */}
          <Col>
            <Text className="footer-copyright-text-enhanced">
              © {currentYear} People Change AI Consulting. {/* Texto atualizado e ano */}
            </Text>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;