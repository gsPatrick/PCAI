// src/components/DifferentiatorsSection/DifferentiatorsSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, List } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import './DifferentiatorsSection.css';

// Importar a nova imagem de fundo
import backgroundCinza from '../../assets/images/backgroundCinza.png';

// Removida a importação do logo: import fullCompanyLogo from '../../assets/images/logo-people-change.png';

const { Title, Paragraph } = Typography;

const differentiatorsData = [
  "Tecnologia com Propósito",
  "Impacto Medido",
  "Adaptativa",
  "Personalizada",
  "Mindset de IA e Inovação",
];

const DifferentiatorsSection = () => {
  const sectionRef = useRef(null);
  // Ref para o container principal do conteúdo (texto + lista) que anima junto
  const mainContentRef = useRef(null);
  // Ref para o elemento gráfico restante (graphic-lines-pattern)
  const graphicElementsRef = useRef([]);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentMainContentRef = mainContentRef.current;
    // Filtrar apenas os elementos gráficos que sobraram (apenas graphic-lines-pattern)
    const currentGraphicElements = graphicElementsRef.current.filter(Boolean);

    // Observer para a classe da seção principal (anima a barra superior)
    const sectionEntryObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            currentSectionRef.classList.add('section-active-enhanced');
            sectionEntryObserver.unobserve(currentSectionRef);
        }
    }, { threshold: 0.05 }); // Threshold baixo para animar a barra logo

    if (currentSectionRef) {
        sectionEntryObserver.observe(currentSectionRef);
    }

    // Observer para o bloco principal de conteúdo (texto e lista)
    const mainContentObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe que ativa a animação para o bloco de conteúdo
                    entry.target.classList.add('content-in-view-enhanced');
                    mainContentObserver.unobserve(entry.target); // Deixa de observar após animar
                }
            });
        },
        { threshold: 0.1 } // Threshold para o conteúdo principal
    );

    if (currentMainContentRef) {
      mainContentObserver.observe(currentMainContentRef);
    }

    // Observer para os elementos gráficos
    const graphicObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe que ativa a animação para o gráfico
                    entry.target.classList.add('graphic-in-view');
                    graphicObserver.unobserve(entry.target); // Deixa de observar após animar
                }
            });
        },
        { threshold: 0.2 } // Threshold para os gráficos
    );

    // Observa cada elemento gráfico restante
    currentGraphicElements.forEach(target => {
        if (target) graphicObserver.observe(target);
    });


    // Função de Limpeza (Cleanup)
    return () => {
        if (currentSectionRef && sectionEntryObserver) {
            sectionEntryObserver.unobserve(currentSectionRef);
        }
        if (currentMainContentRef && mainContentObserver) {
            mainContentObserver.unobserve(currentMainContentRef);
        }
        // Unobserva cada elemento gráfico que foi observado
         currentGraphicElements.forEach(target => {
             if (target && graphicObserver) {
                graphicObserver.unobserve(target);
            }
        });
    };

  }, []); // Array de dependências vazio significa que o efeito roda uma vez ao montar e limpa ao desmontar


  return (
    <div
      ref={sectionRef}
      className="differentiators-section-wrapper enhanced-modern"
      style={{ backgroundImage: `url(${backgroundCinza})` }} // Aplicando a imagem de fundo
    >
      <div className="horizontal-connecting-bar-enhanced"></div>

      {/* Elementos Gráficos (graphic-lines-pattern é o único restante com ref[0]) */}
       {/* Adicionada classe auxiliar 'graphic-animation-target' para o JS observer */}
      <div ref={el => graphicElementsRef.current[0] = el} className="diff-graphic-enhanced graphic-lines-pattern graphic-animation-target">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>


      {/* Ref para o container principal do conteúdo (texto + lista) que anima junto */}
      {/* Adicionada classe auxiliar 'main-content-animation-target' para o JS observer */}
      <div ref={mainContentRef} className="differentiators-main-content-enhanced main-content-animation-target">
        <Row gutter={[64, 56]} align="middle" justify="center">
          <Col xs={24} md={11} lg={12} className="title-logo-column-enhanced">
            <Title level={2} className="section-main-title-enhanced">
              Tecnologia com <span className="highlight-orange-enhanced">Propósito Humano</span>
              <span className="plus-separator-enhanced"> + </span>
              Mindset de <span className="highlight-orange-enhanced">Inovação</span>
            </Title>
            <Paragraph className="section-subtitle-enhanced">
              Esse é o diferencial que definem e impulsionam cada solução que criamos, sempre com foco em resultados e na valorização humana.
            </Paragraph>
          </Col>

          <Col xs={24} md={11} lg={10} className="list-items-column-enhanced">
            <List
              // Mantido sem ref direto na List, pois a animação dos itens é via CSS pelo pai.
              className="differentiators-list-enhanced" // Animação controlada pelo CSS quando o pai (mainContentRef) fica visível
              dataSource={differentiatorsData}
              renderItem={(item, index) => (
                <List.Item
                    className="differentiator-list-point-enhanced"
                    style={{transitionDelay: `${0.6 + index * 0.1}s`}} // Staggering aplicado via CSS delay
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