// src/components/EthicalCommitmentSection/EthicalCommitmentSection.jsx
// O JSX da versão anterior (moderna e minimalista) pode ser mantido em grande parte.
// Vou apenas adicionar os placeholders para os novos elementos gráficos no JSX.
// As classes para animação e os refs já estão lá.

import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, List, Divider } from 'antd';
import {
    AuditOutlined,
    UserSwitchOutlined,
    EyeOutlined,
    LockOutlined,
    TeamOutlined,
    HeartOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import './EthicalCommitmentSection.css'; // Certifique-se que o nome do arquivo CSS é o mesmo

// Importar a nova imagem de fundo
import backgroundCinza from '../../assets/images/backgroundCinza.png';

const { Title, Paragraph, Text } = Typography;

const corePrinciples = [
  { icon: <UserSwitchOutlined />, text: "Justiça e Inclusividade" },
  { icon: <EyeOutlined />, text: "Transparência e Explicabilidade" },
  { icon: <LockOutlined />, text: "Privacidade e Proteção de Dados" },
  { icon: <TeamOutlined />, text: "Supervisão Humana" },
  { icon: <HeartOutlined />, text: "Bem-Estar e Desenvolvimento Humano" },
  { icon: <SafetyCertificateOutlined />, text: "Responsabilidade e Melhoria Contínua" },
];

const internationalStandards = [
  "Recomendação da UNESCO sobre Ética da Inteligência Artificial (2021);",
  "AI Act da União Europeia (2024);",
  "Princípios da OCDE para a Inteligência Artificial;",
  "Norma ISO/IEC 42001 para Sistemas de Gestão de Inteligência Artificial;",
  "Global Digital Compact - UN Global."
];

const EthicalCommitmentSection = () => {
  const sectionRef = useRef(null);
  const mainContentRef = useRef(null); // Ref para o bloco do título principal
  const principlesListRef = useRef(null);
  const diagramSideRef = useRef(null); // Ref para o bloco da direita
  // Ref para o breadcrumb
  const breadcrumbRef = useRef(null);
  // Refs para elementos gráficos
  const graphicRefs = useRef([]);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    graphicRefs.current = graphicRefs.current.slice(0, 3); // Para 3 elementos gráficos de exemplo

    const targetsToObserve = [
        breadcrumbRef.current, // Adiciona o breadcrumb aos targets de observação
        mainContentRef.current,
        principlesListRef.current,
        diagramSideRef.current,
        ...graphicRefs.current.filter(Boolean) // Adiciona os gráficos ao observer
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ethics-item-visible-enhanced');
            // Aplicar delay se necessário para gráficos
            if (entry.target.dataset.graphicDelay) {
              entry.target.style.transitionDelay = entry.target.dataset.graphicDelay;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targetsToObserve.forEach(target => {
      if(target) observer.observe(target);
    });

    const sectionEntryObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            currentSectionRef.classList.add('ethics-section-active-enhanced');
            sectionEntryObserver.unobserve(currentSectionRef);
        }
    }, { threshold: 0.05 });

    if (currentSectionRef) sectionEntryObserver.observe(currentSectionRef);

    return () => {
      targetsToObserve.forEach(target => {
          if(target) observer.unobserve(target);
      });
      if (currentSectionRef) sectionEntryObserver.unobserve(currentSectionRef);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="ethical-commitment-section-wrapper enhanced-ethics"
      style={{ backgroundImage: `url(${backgroundCinza})` }} // Aplicando a imagem de fundo
    >
      {/* Removido o overlay, pois a imagem de fundo já tem um ton escuro e textura */}
      {/* <div className="ethical-intro-overlay"></div> */}

      {/* Elementos Gráficos Aprimorados */}
      <div ref={el => graphicRefs.current[0] = el} className="ethics-graphic-enhanced graphic-concentric-circles" data-graphic-delay="0.3s">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
      </div>
      <div ref={el => graphicRefs.current[1] = el} className="ethics-graphic-enhanced graphic-dynamic-lines" data-graphic-delay="0.5s">
        <div className="d-line dl1"></div>
        <div className="d-line dl2"></div>
        <div className="d-line dl3"></div>
      </div>
      <div ref={el => graphicRefs.current[2] = el} className="ethics-graphic-enhanced graphic-subtle-grid" data-graphic-delay="0.2s"></div>


      <div className="ethical-commitment-content-area-enhanced">

        {/* NOVA ROW PARA O BREADCRUMB */}
        <Row ref={breadcrumbRef} className="ethics-breadcrumb-row animation-target-ethics-enhanced" data-delay="0.2"> {/* Adicionado ref e classes de animação */}
          <Col>
            <Text className="ethics-breadcrumb-text">
              Quem somos | <span className="breadcrumb-current">Compromisso Ético</span> {/* Texto do breadcrumb */}
            </Text>
          </Col>
        </Row>


        <div ref={mainContentRef} className="ethical-main-text-block-enhanced animation-target-ethics-enhanced">
          <Title level={1} className="ethical-main-title-enhanced">
            O nosso <span className="highlight-ethics-enhanced">Compromisso Ético</span><br />com Pessoas e Tecnologia {/* Adicionada quebra de linha */}
          </Title>
          <Paragraph className="ethical-intro-paragraph-enhanced">
            Acreditamos que a inovação tecnológica só faz sentido se respeitar, proteger e potenciar as pessoas.
            Na <strong className="company-name-ethics-enhanced">People Change AI Consulting</strong>, a ética não é um acessório — é a base de tudo o que criamos.
          </Paragraph>
        </div>

        {/* Removido align="top". O padrão do Ant Design Row é stretch, e com flex-grow no conteúdo, as colunas devem alinhar os fundos. */}
        <Row gutter={[64, 56]} className="ethical-details-row-enhanced"> {/* Aumentado gutter vertical */}
          <Col xs={24} md={14} lg={15} className="principles-column-enhanced">
            <div ref={principlesListRef} className="principles-list-block-enhanced animation-target-ethics-enhanced">
              <Title level={3} className="principles-list-title-enhanced">Princípios Essenciais da Nossa Atuação</Title>
              <List
                className="core-principles-list-enhanced"
                itemLayout="horizontal"
                dataSource={corePrinciples}
                renderItem={(item, index) => (
                  <List.Item
                    className="principle-item-enhanced"
                    style={{transitionDelay: `${0.4 + index * 0.12}s`}} // Stagger mais suave
                  >
                    <List.Item.Meta
                      avatar={<span className="principle-icon-enhanced">{item.icon}</span>}
                      title={<span className="principle-text-enhanced">{item.text}</span>}
                    />
                    {/* Mantido o elemento da linha, mas o hover foi removido no CSS */}
                    <div className="principle-item-accent-line"></div>
                  </List.Item>
                )}
              />
            </div>
          </Col>

          <Col xs={24} md={10} lg={9} className="diagram-standards-column-enhanced">
            {/* diagramSideRef e animation-target-ethics-enhanced no container pai */}
            <div ref={diagramSideRef} className="diagram-and-standards-block-enhanced animation-target-ethics-enhanced">
              <div className="ethical-diagram-placeholder-enhanced">
                <div className="diagram-icon-bg">
                    <AuditOutlined className="diagram-main-icon-enhanced"/>
                </div>
                <Title level={5} className="diagram-text-enhanced">IA Ética e Humanizada</Title>
                <Text className="diagram-company-name-enhanced">PEOPLE CHANGE AI CONSULTING</Text>
              </div>
              <div className="standards-block-enhanced">
                <Title level={5} className="standards-title-enhanced">Referência às Normas e Padrões Internacionais</Title>
                <Paragraph className="standards-intro-enhanced">
                    Nosso compromisso ético alinha-se com as principais referências, incluindo:
                </Paragraph>
                <ul className="standards-list-enhanced">
                  {internationalStandards.map((standard, index) => (
                    <li key={index} style={{transitionDelay: `${0.6 + index * 0.1}s`}}>{standard}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
        </Row>

        <div className="ethical-closing-statement-enhanced animation-target-ethics-enhanced">
            <Paragraph>
            Inovamos para o progresso humano e construímos o futuro com <span className="highlight-ethics-enhanced">ética</span>, <span className="highlight-ethics-enhanced">inteligência</span> e <span className="highlight-ethics-enhanced">propósito</span>.
            </Paragraph>
        </div>

      </div>
    </div>
  );
};

export default EthicalCommitmentSection;