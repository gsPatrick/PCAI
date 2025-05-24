// src/components/ContactSection/ContactSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { MailOutlined, PhoneOutlined, GlobalOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './ContactSection.css';

import fullCompanyLogo from '../../assets/images/logo-people-change.png';

const { Title, Paragraph, Link } = Typography;

const contactInfo = {
  generalEmail: "contato@peoplechangeai.com", // E-mail geral para o botão principal
  marco: {
    name: "Marco Almas",
    email: "marcoalmas@peoplechangeai.com",
    phonePT: "+351 936 839 976",
  },
  hugo: {
    name: "Hugo Gripa",
    email: "hugogripa@peoplechangeai.com",
    phonePT: "+351 911 767 705",
    phoneBR: "+55 21 98121 4364",
  }
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  const mainBlockRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const targetsToObserve = [mainBlockRef.current, detailsRef.current].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('contact-alt-item-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targetsToObserve.forEach(target => {
      if (target) observer.observe(target);
    });
    
    const sectionEntryObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            currentSectionRef.classList.add('contact-alt-section-active');
            sectionEntryObserver.unobserve(currentSectionRef);
        }
    }, { threshold: 0.05 });
    
    if (currentSectionRef) sectionEntryObserver.observe(currentSectionRef);

    return () => {
      targetsToObserve.forEach(target => {
        if (target) observer.unobserve(target);
      });
       if (currentSectionRef) sectionEntryObserver.unobserve(currentSectionRef);
    };
  }, []);

  return (
    <div ref={sectionRef} className="contact-section-wrapper alt-contact-design">
      {/* Elementos Gráficos */}
      <div className="contact-alt-graphic graphic-bg-wave"></div>
      <div className="contact-alt-graphic graphic-accent-dots-alt">
        {[...Array(7)].map((_,i)=><div key={i} className="dot-alt"></div>)}
      </div>


      <div className="contact-alt-content-area">
        <div ref={mainBlockRef} className="contact-main-call-block animation-target-contact-alt">
          <img src={fullCompanyLogo} alt="People Change AI Consulting" className="contact-alt-logo" />
          <Title level={1} className="contact-main-heading-alt">
            Prontos para <span className="highlight-alt">Cocriar</span> o Futuro?
          </Title>
          <Paragraph className="contact-subtitle-alt">
            A IA já está aqui. O verdadeiro desafio é aplicá-la com propósito e foco humano para transformar a sua realidade.
            Vamos conversar sobre como podemos fazer isso juntos.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            className="contact-main-cta-button"
            href={`mailto:${contactInfo.generalEmail}`}
            icon={<MailOutlined />}
          >
            Entre em Contato
          </Button>
        </div>

        <div ref={detailsRef} className="contact-details-grid-alt animation-target-contact-alt">
          <Title level={3} className="contact-details-title">Ou fale diretamente conosco:</Title>
          <Row gutter={[32, 32]} justify="center">
            {/* Marco Almas */}
            <Col xs={24} sm={12} lg={10} className="person-contact-col-alt">
              <div className="person-contact-card-alt">
                <Title level={4} className="person-name-alt">{contactInfo.marco.name}</Title>
                <Paragraph>
                  <MailOutlined /> <Link href={`mailto:${contactInfo.marco.email}`}>{contactInfo.marco.email}</Link>
                </Paragraph>
                <Paragraph>
                  <PhoneOutlined /> 🇵🇹 {contactInfo.marco.phonePT}
                </Paragraph>
              </div>
            </Col>
            {/* Hugo Gripa */}
            <Col xs={24} sm={12} lg={10} className="person-contact-col-alt">
              <div className="person-contact-card-alt">
                <Title level={4} className="person-name-alt">{contactInfo.hugo.name}</Title>
                <Paragraph>
                  <MailOutlined /> <Link href={`mailto:${contactInfo.hugo.email}`}>{contactInfo.hugo.email}</Link>
                </Paragraph>
                <Paragraph>
                  <PhoneOutlined /> 🇵🇹 {contactInfo.hugo.phonePT}
                </Paragraph>
                {contactInfo.hugo.phoneBR && (
                  <Paragraph>
                    <PhoneOutlined /> 🇧🇷 {contactInfo.hugo.phoneBR}
                  </Paragraph>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;