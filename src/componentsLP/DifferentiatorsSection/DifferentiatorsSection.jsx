// src/components/DifferentiatorsSection/DifferentiatorsSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, List } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import './DifferentiatorsSection.css';

// Importar a nova imagem de fundo
import backgroundCinza from '../../assets/images/backgroundCinza.png';

// Removida a importação do logo: import fullCompanyLogo from '../../assets/images/logo-people-change.png';

const { Title, Paragraph, Text } = Typography;

const differentiatorsData = [
  "Tecnologia com Propósito",
  "Impacto Medido",
  "Adaptativa",
  "Personalizada",
  "Mindset de IA e Inovação",
];

const DifferentiatorsSection = () => {
  const sectionRef = useRef(null);
  // Ref para o novo título padronizado
  const standardTitleRef = useRef(null);
  // Ref para o container principal do conteúdo (texto + lista) que anima junto
  const mainContentRef = useRef(null);
  // Ref para o elemento gráfico restante (graphic-lines-pattern)
  const graphicElementsRef = useRef([]);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentMainContentRef = mainContentRef.current;
     // Filtrar apenas os elementos gráficos que sobraram (apenas graphic-lines-pattern)
    const currentGraphicElements = graphicElementsRef.current.filter(Boolean);

    // Observar o novo título padronizado, o bloco principal de conteúdo e os elementos gráficos
    const targetsToObserve = [
        standardTitleRef.current, // Novo target
        currentMainContentRef,
        ...currentGraphicElements // Adiciona os gráficos
    ].filter(Boolean);


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

    // Observer único para o título padronizado, bloco principal de conteúdo e gráficos
    const contentAndGraphicObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe que ativa a animação
                    entry.target.classList.add('content-in-view-enhanced'); // Usando a mesma classe para simplificar
                    // Deixa de observar após animar
                     contentAndGraphicObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 } // Threshold para os elementos
    );

    // Observa cada target
    targetsToObserve.forEach(target => {
        if (target) contentAndGraphicObserver.observe(target);
    });


    // Função de Limpeza (Cleanup)
    return () => {
        if (currentSectionRef && sectionEntryObserver) {
            sectionEntryObserver.unobserve(currentSectionRef);
        }
         // Unobserva cada target que foi observado pelo contentAndGraphicObserver
        targetsToObserve.forEach(target => {
             if (target && contentAndGraphicObserver) {
                contentAndGraphicObserver.unobserve(target);
            }
        });
    };

  }, []); // Array de dependências vazio significa que o efeito roda uma vez ao montar e limpa ao desmontar


  return (
    <div
      id="diferencial" // ID para linkagem do header
      ref={sectionRef}
      className="differentiators-section-wrapper enhanced-modern"
      style={{ backgroundImage: `url(${backgroundCinza})` }} // Aplicando a imagem de fundo
    >
      <div className="horizontal-connecting-bar-enhanced"></div>

      {/* Elementos Gráficos (graphic-lines-pattern é o único restante com ref[0]) */}
       {/* Adicionada classe auxiliar 'graphic-animation-target' para o JS observer */}
       {/* Removida a classe 'graphic-animation-target', usando 'animation-target-enhanced' e 'content-in-view-enhanced' para consistência */}
      <div ref={el => graphicElementsRef.current[0] = el} className="diff-graphic-enhanced graphic-lines-pattern animation-target-enhanced">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>


      <div className="differentiators-main-content-enhanced">
         {/* NOVO: Título Padronizado "Quem somos | O Nosso Diferencial" */}
         <Row ref={standardTitleRef} className="section-standard-title-row animation-target-enhanced"> {/* Usando a classe de animação */}
           <Col>
             <Text className="section-standard-title-text">
               Quem somos | <span className="section-standard-title-current">O Nosso Diferencial</span>
             </Text>
           </Col>
         </Row>

        {/* Ref para o container principal do conteúdo (texto + lista) que anima junto */}
        {/* Adicionada classe auxiliar 'main-content-animation-target' para o JS observer */}
        <div ref={mainContentRef} className="main-content-animation-target animation-target-enhanced"> {/* Adicionada classe animation-target-enhanced */}
          <Row gutter={[64, 56]} align="middle" justify="center">
            <Col xs={24} md={11} lg={12} className="title-logo-column-enhanced">
              {/* TÍTULO PRINCIPAL AJUSTADO */}
              <Title level={2} className="section-main-title-enhanced">
                <span className="highlight-orange-enhanced">Tecnologia com Propósito Humano</span>
                <span className="plus-separator-enhanced"> + </span>
                <span className="highlight-blue-marinho-enhanced">Mindset de Inovação</span> {/* Nova span para azul marinho */}
              </Title>
              {/* SUBTÍTULO CORRIGIDO */}
              <Paragraph className="section-subtitle-enhanced">
                Esse é o diferencial que define e impulsiona cada solução que criamos, sempre com o foco nos resultados e na valorização humana.
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
                      // Staggering aplicado via CSS delay (agora que o pai anima)
                      style={{transitionDelay: `${0.6 + index * 0.1}s`}}
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
    </div>
  );
};

export default DifferentiatorsSection;