// src/components/PillarsSection/PillarsSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography } from 'antd';
import './PillarsSection.css';

const { Title, Paragraph, Text } = Typography;

const pillarsData = [
  {
    key: 'people',
    title: 'PEOPLE',
    description: [
      'Colocamos o ser humano no centro da inovação.',
      'Acreditamos que a tecnologia só faz sentido se ampliar talentos, proteger culturas e fortalecer equipas.'
    ],
  },
  {
    key: 'change',
    title: 'CHANGE',
    description: [
      'Facilitamos a mudança com leveza, estratégia e propósito.',
      'Acreditamos que a verdadeira transformação é aquela que respeita o tempo e a essência de quem a vive.'
    ],
  },
  {
    key: 'ai',
    title: 'AI',
    description: [
      'Aplicamos Inteligência Artificial com ética, consciência e foco humano — sempre ao serviço da vida nas organizações.'
    ],
  },
];

const PillarsSection = () => {
  const sectionRef = useRef(null);
  const pillarColRefs = useRef(pillarsData.map(() => React.createRef()));

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentPillarColRefs = pillarColRefs.current;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          currentSectionRef.classList.add('section-visible');
          sectionObserver.unobserve(currentSectionRef);
        }
      },
      { threshold: 0.1 }
    );

    if (currentSectionRef) {
      sectionObserver.observe(currentSectionRef);
    }

    const pillarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pillar-col-visible');
            pillarObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 } 
    );

    currentPillarColRefs.forEach(ref => {
      if (ref.current) {
        pillarObserver.observe(ref.current);
      }
    });

    return () => {
      if (currentSectionRef) {
        sectionObserver.unobserve(currentSectionRef);
      }
      currentPillarColRefs.forEach(ref => {
        if (ref.current) {
          pillarObserver.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="pillars-section-wrapper">
      <div className="pillars-left-accent-bar"></div>
      
      {/* Elementos Gráficos */}
      <div className="pillar-graphic graphic-circle-1"></div>
      <div className="pillar-graphic graphic-line-1"></div>
      <div className="pillar-graphic graphic-dots-pattern">
        {/* Gerar alguns pontos para o padrão */}
        {[...Array(10)].map((_, i) => <div key={i} className="dot"></div>)}
      </div>


      <div className="pillars-content-area">
        <Row className="pillars-breadcrumb-row">
          <Col>
            <Text className="pillars-breadcrumb-text">
              Quem somos | <span className="breadcrumb-current">Pilares</span>
            </Text>
          </Col>
        </Row>

        <Row gutter={{ xs: 30, sm: 40, md: 50, lg: 70 }} className="pillars-items-row" align="top">
          {pillarsData.map((pillar, index) => (
            <Col
              key={pillar.key}
              xs={24} 
              sm={24}
              md={8} 
              className="pillar-column"
              ref={pillarColRefs.current[index]}
            >
              <div className="pillar-content-holder">
                <div className="pillar-title-wrapper">
                  <Title level={1} className="pillar-main-heading">
                    {pillar.title}
                  </Title>
                  <div className="pillar-heading-underline"></div>
                </div>
                <div className="pillar-text-block">
                  {pillar.description.map((text, i) => (
                    <Paragraph key={i} className="pillar-item-description">
                      {text}
                    </Paragraph>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="pillars-footer-signature-row">
          <Col>
            <Text className="pillars-footer-text">PEOPLE CHANGE AI CONSULTING</Text>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PillarsSection;