// src/components/ContactSection/ContactSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons'; // Manter apenas MailOutlined para o botão
import './ContactSection.css';

// Importar a nova imagem de fundo
import backgroundCinza from '../../assets/images/backgroundCinza.png';

const { Title, Paragraph, Text } = Typography; // Importar Text para o breadcrumb

const contactInfo = {
  generalEmail: "contato@peoplechangeai.com", // Mantido para referência, mas não usado no botão principal
  marco: {
    name: "Marco Almas",
    email: "marcoalmas@peoplechangeai.com",
    // phonePT: "+351 936 839 976", // Removido
  },
  hugo: {
    name: "Hugo Gripa",
    email: "hugogripa@peoplechangeai.com",
    // phonePT: "+351 911 767 705", // Removido
    // phoneBR: "+55 21 98121 4364", // Removido
  }
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  // Ref para o novo título padronizado (substitui breadcrumbRef)
  const standardTitleRef = useRef(null);
  const mainBlockRef = useRef(null); // Para o título e subtítulo principal
  const detailsRef = useRef(null); // Para a grid de cards

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    // Observar o novo título padronizado, o bloco principal de texto e a grid de detalhes (cards)
    const targetsToObserve = [
        standardTitleRef.current, // NOVO Ref
        mainBlockRef.current,
        detailsRef.current
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('contact-alt-item-visible');
            // Não unobserve imediatamente para permitir animação de stagger nos filhos
            // observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Ajustado threshold
    );

    targetsToObserve.forEach(target => {
      if (target) observer.observe(target);
    });

    // Observer para ativar a seção (animações de fundo)
    const sectionEntryObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            currentSectionRef.classList.add('contact-alt-section-active');
            sectionEntryObserver.unobserve(currentSectionRef); // Unobserve a seção depois de ativada
        }
    }, { threshold: 0.05 }); // Inicia as animações de fundo mais cedo

    if (currentSectionRef) sectionEntryObserver.observe(currentSectionRef);


    // Cleanup function
    return () => {
      targetsToObserve.forEach(target => {
        if (target) observer.unobserve(target);
      });
       if (currentSectionRef) sectionEntryObserver.unobserve(currentSectionRef);
    };
  }, []); // Dependências vazias para executar apenas uma vez

  return (
    <div
      id="contact" // ID para linkagem do header
      ref={sectionRef}
      className="contact-section-wrapper alt-contact-design"
      style={{ backgroundImage: `url(${backgroundCinza})` }} // Aplicando a imagem de fundo
    >
      {/* Elementos Gráficos (Manter, ajustar estilos no CSS) */}
      <div className="contact-alt-graphic graphic-bg-wave"></div>
      <div className="contact-alt-graphic graphic-accent-dots-alt">
        {[...Array(7)].map((_,i)=><div key={i} className="dot-alt"></div>)}
      </div>

      <div className="contact-alt-content-area">
        {/* NOVO: Título Padronizado "Contato" - SUBSTITUI O BREADCRUMB ANTIGO */}
         <Row ref={standardTitleRef} className="section-standard-title-row animation-target-contact-alt"> {/* Usando as classes de animação da seção */}
            <Col>
              <Text className="section-standard-title-text">
                Contacto
              </Text>
            </Col>
         </Row>


        <div ref={mainBlockRef} className="contact-main-call-block animation-target-contact-alt">
          {/* <img src={fullCompanyLogo} alt="People Change AI Consulting" className="contact-alt-logo" /> LOGO REMOVIDA */}
          <Title level={1} className="contact-main-heading-alt">
            Prontos para <span className="highlight-alt">Cocriar</span> o Futuro?
          </Title>
          {/* SUBTÍTULO CORRIGIDO */}
          <Paragraph className="contact-subtitle-alt">
            A IA já está aqui. O verdadeiro desafio é aplicá-la com propósito e foco humano para transformar a sua realidade.
            Vamos conversar e perceber que desafios a sua empresa precisa solucionar?
          </Paragraph>
          {/* BOTÃO PRINCIPAL REMOVIDO */}
          {/*
          <Button
            type="primary"
            size="large"
            className="contact-main-cta-button"
            href={`mailto:${contactInfo.generalEmail}`}
            icon={<MailOutlined />}
          >
            Entre em Contato
          </Button>
          */}
        </div>

        <div ref={detailsRef} className="contact-details-grid-alt animation-target-contact-alt">
          {/* Título "Ou fale diretamente conosco" REMOVIDO */}
          {/* <Title level={3} className="contact-details-title">Ou fale diretamente conosco:</Title> */}
          <Row gutter={[32, 32]} justify="center">
            {/* Marco Almas */}
            <Col xs={24} sm={12} lg={10} className="person-contact-col-alt">
              <div className="person-contact-card-alt">
                <Title level={4} className="person-name-alt">{contactInfo.marco.name}</Title>
                {/* EMAIL E TELEFONE REMOVIDOS */}
                {/* <Paragraph><MailOutlined /> <Link href={`mailto:${contactInfo.marco.email}`}>{contactInfo.marco.email}</Link></Paragraph> */}
                {/* <Paragraph><PhoneOutlined /> 🇵🇹 {contactInfo.marco.phonePT}</Paragraph> */}
                {/* BOTÃO "ENTRE EM CONTATO" ADICIONADO */}
                <Button
                  type="primary"
                  size="large"
                  className="contact-person-cta-button"
                  href={`mailto:${contactInfo.marco.email}`}
                  icon={<MailOutlined />}
                >
                  Entre em contato
                </Button>
              </div>
            </Col>
            {/* Hugo Gripa */}
            <Col xs={24} sm={12} lg={10} className="person-contact-col-alt">
              <div className="person-contact-card-alt">
                <Title level={4} className="person-name-alt">{contactInfo.hugo.name}</Title>
                 {/* EMAIL E TELEFONE REMOVIDOS */}
                {/* <Paragraph><MailOutlined /> <Link href={`mailto:${contactInfo.hugo.email}`}>{contactInfo.hugo.email}</Link></Paragraph> */}
                {/* <Paragraph><PhoneOutlined /> 🇵🇹 {contactInfo.hugo.phonePT}</Paragraph> */}
                {/* {contactInfo.hugo.phoneBR && (<Paragraph><PhoneOutlined /> 🇧🇷 {contactInfo.hugo.phoneBR}</Paragraph>)} */}
                 {/* BOTÃO "ENTRE EM CONTATO" ADICIONADO */}
                <Button
                  type="primary"
                  size="large"
                  className="contact-person-cta-button"
                  href={`mailto:${contactInfo.hugo.email}`}
                  icon={<MailOutlined />}
                >
                  Entre em contato
                </Button>
              </div>
            </Col>
          </Row>
        </div>
         {/* Website Link REMOVIDO */}
         {/*
        <Row justify="center">
            <Col>
                 <Paragraph className="website-link-alt">
                     <GlobalOutlined /> Ou visite nosso site: <Link href="https://peoplechangeai.com" target="_blank">peoplechangeai.com</Link>
                 </Paragraph>
            </Col>
        </Row>
         */}
      </div>
    </div>
  );
};

export default ContactSection;