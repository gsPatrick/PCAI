// src/components/DifferentiatorsSection/DifferentiatorsSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, List } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import './DifferentiatorsSection.css';

import fullCompanyLogo from '../../assets/images/logo-people-change.png'; 

const { Title, Paragraph } = Typography;

const differentiatorsData = [
  "IA Humanizada",
  "Tecnologia com Propósito",
  "Impacto Medido",
  "Adaptativa",
  "Personalizada",
  "Mindset de IA e Inovação",
];

const DifferentiatorsSection = () => {
  const sectionRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const graphicElementsRef = useRef([]); // Para animar elementos gráficos individualmente

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentContentWrapperRef = contentWrapperRef.current;
    const currentGraphicElements = graphicElementsRef.current.filter(Boolean);

    const sectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        currentSectionRef.classList.add('section-active-enhanced');
        sectionObserver.unobserve(currentSectionRef);
      }
    }, { threshold: 0.05 });

    if (currentSectionRef) {
      sectionObserver.observe(currentSectionRef);
    }

    const contentObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        currentContentWrapperRef.classList.add('content-in-view-enhanced');
        contentObserver.unobserve(currentContentWrapperRef);
        
        // Animar elementos gráficos quando o conteúdo principal estiver visível
        currentGraphicElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('graphic-in-view');
            }, index * 200 + 500); // Staggering para os gráficos após o conteúdo
        });
      }
    }, { threshold: 0.15 });

    if (currentContentWrapperRef) {
      contentObserver.observe(currentContentWrapperRef);
    }

    return () => {
      if (currentSectionRef) sectionObserver.unobserve(currentSectionRef);
      if (currentContentWrapperRef) contentObserver.unobserve(currentContentWrapperRef);
    };
  }, []);

  return (
    <div ref={sectionRef} className="differentiators-section-wrapper enhanced-modern">
      <div className="horizontal-connecting-bar-enhanced"></div>
      
      {/* Elementos Gráficos */}
      <div ref={el => graphicElementsRef.current[0] = el} className="diff-graphic-enhanced graphic-circle-subtle"></div>
      <div ref={el => graphicElementsRef.current[1] = el} className="diff-graphic-enhanced graphic-lines-pattern">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div ref={el => graphicElementsRef.current[2] = el} className="diff-graphic-enhanced graphic-accent-shape"></div>

      <div ref={contentWrapperRef} className="differentiators-main-content-enhanced animation-target-enhanced">
        <Row gutter={[64, 56]} align="middle" justify="center">
          <Col xs={24} md={11} lg={12} className="title-logo-column-enhanced">
            <div className="logo-container-enhanced">
              <img src={fullCompanyLogo} alt="People Change AI Consulting Logo" className="company-logo-main-enhanced" />
            </div>
            <Title level={2} className="section-main-title-enhanced">
              Tecnologia com <span className="highlight-orange-enhanced">Propósito Humano</span>
              <span className="plus-separator-enhanced"> + </span>
              Mindset de <span className="highlight-orange-enhanced">Inovação</span>
            </Title>
            <Paragraph className="section-subtitle-enhanced">
              Estes são os pilares que nos definem e impulsionam cada solução que criamos, sempre com foco em resultados e na valorização humana.
            </Paragraph>
          </Col>

          <Col xs={24} md={11} lg={10} className="list-items-column-enhanced"> {/* Ajustado lg para dar mais espaço ao título */}
            <List
              className="differentiators-list-enhanced"
              dataSource={differentiatorsData}
              renderItem={(item, index) => (
                <List.Item 
                    className="differentiator-list-point-enhanced"
                    style={{transitionDelay: `${0.6 + index * 0.1}s`}} // Staggering para itens da lista
                >
                  <CheckOutlined className="list-point-icon-enhanced" />
                  <span className="list-point-text-enhanced">{item}</span>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DifferentiatorsSection;