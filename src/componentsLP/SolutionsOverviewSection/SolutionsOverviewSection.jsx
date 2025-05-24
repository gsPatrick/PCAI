// src/components/SolutionsOverviewSection/SolutionsOverviewSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography } from 'antd'; // Card não é mais importado diretamente, usamos divs customizadas
import { 
    SettingOutlined, 
    UserSwitchOutlined, 
    ShopOutlined, 
    ToolOutlined, 
    LineChartOutlined, // Ícone para Monitorização
    FundViewOutlined,   // Ícone para Analítica
    RightCircleOutlined 
} from '@ant-design/icons';
import './SolutionsOverviewSection.css';

const { Title, Paragraph } = Typography; // Removido Text pois não é mais usado diretamente

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
  // NOVOS ITENS ADICIONADOS
  {
    icon: <LineChartOutlined />,
    title: "MONITORIZAÇÃO",
    subtitle: "Incluído em todas as soluções",
    description: "Acompanhamento contínuo do desempenho. KPIs essenciais. Relatórios simples e visuais.",
    highlightColor: "var(--solution-color-5, #8B5CF6)", // Roxo como nova cor de destaque
  },
  {
    icon: <FundViewOutlined />,
    title: "ANALÍTICA",
    subtitle: "Upgrade para análise profunda",
    description: "Mapa de interações. Padrões comportamentais. Insights personalizados. Análise de retenção.",
    highlightColor: "var(--solution-color-6, #DB2777)", // Rosa escuro/magenta como nova cor
  },
];

const SolutionsOverviewSection = () => {
  const sectionRef = useRef(null);
  const titleBlockRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const targetsToObserve = [titleBlockRef.current, cardsContainerRef.current, ctaRef.current].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible-in-view');
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
    <div ref={sectionRef} className="solutions-overview-section-wrapper">
      <div className="solution-graphic sol-graphic-1"></div>
      <div className="solution-graphic sol-graphic-2"></div>
      <div className="solution-graphic sol-graphic-3"></div>

      <div className="solutions-content-main">
        <div ref={titleBlockRef} className="solutions-title-block animation-target-solutions">
          <Title level={1} className="solutions-main-title">
            Potenciamos negócios e talentos com <span className="highlight-orange-sol">IA Humanizada.</span>
          </Title>
          <Paragraph className="solutions-main-subtitle">
            De forma modular, prática e alinhada às pessoas.
          </Paragraph>
          <Title level={3} className="solutions-subsection-title">Áreas de Atuação e Dashboards</Title> {/* Título ajustado */}
        </div>

        <div ref={cardsContainerRef} className="solutions-cards-grid animation-target-solutions">
          {solutionsData.map((solution, index) => (
            <div 
              key={index} 
              className="solution-card-wrapper" 
              style={{ '--animation-delay': `${index * 0.12}s`, '--card-highlight-color': solution.highlightColor }} // Ajustado delay base
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

        <div ref={ctaRef} className="solutions-cta-block animation-target-solutions">
          <Paragraph className="solutions-cta-text">
            Qual destas áreas podemos <span className="highlight-orange-sol">começar a transformar</span> consigo?
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default SolutionsOverviewSection;