// src/components/SolutionsOverviewSection/SolutionsOverviewSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography } from 'antd';
import {
    SettingOutlined,
    UserSwitchOutlined,
    ShopOutlined,
    ToolOutlined,
    LineChartOutlined,
    FundViewOutlined,
    RightCircleOutlined,
    ArrowRightOutlined // Usando uma seta diferente
} from '@ant-design/icons';
import './SolutionsOverviewSection.css';

// Importar a imagem de fundo
import backgroundCinza from '../../assets/images/backgroundCinza.png';


const { Title, Paragraph, Text } = Typography;

const solutionsData = [
  {
    icon: <SettingOutlined />,
    title: "Eficiência Interna e Operacional",
    subtitle: "BackOffice",
    description: "Otimize processos, reduza custos e automatize tarefas repetitivas com IA inteligente.",
    highlightColor: "var(--solution-color-1, #EF7C12)",
  },
  {
    icon: <UserSwitchOutlined />,
    title: "Recrutamento, Talento e Aprendizagem",
    description: "Identifique, atraia e desenvolva os melhores talentos com ferramentas de IA preditivas e personalizadas.",
    highlightColor: "var(--solution-color-2, #3A3D57)",
  },
  {
    icon: <ShopOutlined />,
    title: "Comercial e Marketing",
    description: "Melhore a experiência do cliente, personalize campanhas e aumente suas vendas com insights de IA.",
    highlightColor: "var(--solution-color-3, #4299E1)",
  },
  {
    icon: <ToolOutlined />,
    title: "Soluções à Medida",
    description: "Desenvolvemos soluções de IA totalmente customizadas para atender aos desafios únicos do seu negócio.",
    highlightColor: "var(--solution-color-4, #48BB78)",
  },
  // NOVOS ITENS ADICIONADOS (Design diferente e em baixo)
  {
    icon: <LineChartOutlined />,
    title: "MONITORIZAÇÃO",
    subtitle: "Incluído em todas as soluções",
    description: "Acompanhamento contínuo do desempenho. KPIs essenciais. Relatórios simples e visuais.",
    highlightColor: "var(--solution-color-5, #8B5CF6)", // Roxo
  },
  {
    icon: <FundViewOutlined />,
    title: "ANALÍTICA",
    subtitle: "Upgrade para análise profunda",
    description: "Mapa de interações. Padrões comportamentais. Insights personalizados. Análise de retenção.",
    highlightColor: "var(--solution-color-6, #DB2777)", // Magenta
  },
];

const topSolutionsData = solutionsData.slice(0, 4);
const bottomSolutionsData = solutionsData.slice(4);

const SolutionsOverviewSection = () => {
  const sectionRef = useRef(null);
  const titleBlockRef = useRef(null);
  const topCardsContainerRef = useRef(null); // Ref para o primeiro grid
  const bottomCardsContainerRef = useRef(null); // Ref para o segundo grid
  const ctaRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const targetsToObserve = [
        titleBlockRef.current,
        topCardsContainerRef.current, // Adiciona o primeiro grid
        bottomCardsContainerRef.current, // Adiciona o segundo grid
        ctaRef.current
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible-in-view');
            // Atraso aplicado via CSS para os filhos
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targetsToObserve.forEach(target => {
      if (target) observer.observe(target);
    });

    const sectionEntryObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            currentSectionRef.classList.add('section-activated');
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
    <div
      ref={sectionRef}
      className="solutions-overview-section-wrapper"
      style={{ backgroundImage: `url(${backgroundCinza})` }} // Aplicando a imagem de fundo
    >
      {/* Elementos Gráficos de Fundo (mantidos, mas podem ser ajustados no CSS se necessário) */}
      <div className="solution-graphic sol-graphic-1"></div>
      <div className="solution-graphic sol-graphic-2"></div>
      <div className="solution-graphic sol-graphic-3"></div>

      <div className="solutions-content-main">
        <div ref={titleBlockRef} className="solutions-title-block animation-target-solutions">
          <Title level={1} className="solutions-main-title">
            Potenciamos negócios e talentos com<br/>
            <span className="highlight-orange-sol">IA Humanizada.</span> {/* Quebra de linha e IA junto */}
          </Title>
          <Paragraph className="solutions-main-subtitle nazalization-font"> {/* Aplicando Nazalization */}
            De forma modular, prática e alinhada às pessoas.
          </Paragraph>
          <Title level={3} className="solutions-subsection-title">Áreas de Atuação e Dashboards</Title>
        </div>

        {/* GRID DOS 4 PRIMEIROS CARDS */}
        <div ref={topCardsContainerRef} className="solutions-cards-grid animation-target-solutions top-cards-grid">
          {topSolutionsData.map((solution, index) => (
            <div
              key={index}
              className="solution-card-wrapper"
              // Delay para stagger dentro deste grid
              style={{ '--animation-delay': `${index * 0.1}s`, '--card-highlight-color': solution.highlightColor }}
            >
              <div className="solution-card-inner">
                <div className="card-icon-container">
                  <span className="icon-bg-shape"></span>
                  {solution.icon}
                </div>
                <Title level={4} className="solution-card-title">
                  {solution.title}
                  {solution.subtitle && <span className="solution-card-subtitle-tag">{solution.subtitle}</span>}
                </Title>
                <Paragraph className="solution-card-description">{solution.description}</Paragraph>
                <RightCircleOutlined className="solution-card-arrow" />
              </div>
            </div>
          ))}
        </div>

        {/* GRID DOS 2 CARDS DE BAIXO (DESIGN DIFERENTE) */}
        <div ref={bottomCardsContainerRef} className="solutions-cards-grid animation-target-solutions bottom-cards-grid">
           {/* Título específico para a seção de dashboards, se necessário. Ou manter o de cima. */}
            {/* <Title level={3} className="solutions-subsection-title-alt">Dashboards e Monitoramento</Title> */}
          {bottomSolutionsData.map((solution, index) => (
            <div
              key={index}
              className="solution-card-wrapper-alt" // Classe diferente
              // Delay para stagger dentro deste grid
              style={{ '--animation-delay': `${index * 0.1}s`, '--card-highlight-color': solution.highlightColor }}
            >
              <div className="solution-card-inner-alt">
                 <div className="card-alt-icon-container">
                    {solution.icon}
                 </div>
                 <div className="card-alt-content">
                    <Title level={4} className="solution-card-alt-title">{solution.title}</Title>
                    {solution.subtitle && <Text className="solution-card-alt-subtitle">{solution.subtitle}</Text>}
                    <Paragraph className="solution-card-alt-description">{solution.description}</Paragraph>
                 </div>
                 <ArrowRightOutlined className="solution-card-alt-arrow" /> {/* Ícone diferente */}
              </div>
            </div>
          ))}
        </div>


        <div ref={ctaRef} className="solutions-cta-block animation-target-solutions">
          <Paragraph className="solutions-cta-text nazalization-font"> {/* Aplicando Nazalization */}
            Qual destas áreas podemos <span className="highlight-orange-sol">começar a transformar</span> consigo?
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default SolutionsOverviewSection;