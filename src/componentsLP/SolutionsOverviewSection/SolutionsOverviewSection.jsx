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
    // Remover RightCircleOutlined e ArrowRightOutlined pois as setas serão removidas
    // RightCircleOutlined,
    // ArrowRightOutlined
} from '@ant-design/icons';
import './SolutionsOverviewSection.css';

// Importar a imagem de fundo AZUL
import backgroundAzul from '../../assets/images/backgroundAzul.png';


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
   // Ref para o novo título padronizado
  const standardTitleRef = useRef(null);
  const titleBlockRef = useRef(null); // Ref para o bloco do título principal e subtítulos
  const topCardsContainerRef = useRef(null); // Ref para o primeiro grid
  const bottomCardsContainerRef = useRef(null); // Ref para o segundo grid
  const ctaRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    // Observar o novo título padronizado, o bloco do título principal, os grids de cards e o CTA
    const targetsToObserve = [
        standardTitleRef.current, // Novo target
        titleBlockRef.current,
        topCardsContainerRef.current,
        bottomCardsContainerRef.current,
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
      id="solutions" // ID para linkagem do header
      ref={sectionRef}
      className="solutions-overview-section-wrapper"
      style={{ backgroundImage: `url(${backgroundAzul})` }} // Aplicando a imagem de fundo AZUL
    >
      {/* Elementos Gráficos de Fundo (mantidos, mas podem ser ajustados no CSS se necessário) */}
      <div className="solution-graphic sol-graphic-1"></div>
      <div className="solution-graphic sol-graphic-2"></div>
      <div className="solution-graphic sol-graphic-3"></div>

      <div className="solutions-content-main">

         {/* NOVO: Título Padronizado "As Soluções | Visão Geral" */}
         {/* Usando a mesma classe de animação que outros elementos para o Observer */}
         <Row ref={standardTitleRef} className="section-standard-title-row animation-target-solutions">
           <Col>
             <Text className="section-standard-title-text">
               As Soluções | <span className="section-standard-title-current-azul">Visão Geral</span>
             </Text>
           </Col>
         </Row>

        <div ref={titleBlockRef} className="solutions-title-block animation-target-solutions">
          {/* Título principal - Corrigido texto, cor agora branca via CSS */}
          <Title level={1} className="solutions-main-title">
            Potenciamos negócios e talentos com<br/>
            <span className="highlight-orange-sol">IA Humanizada.</span> {/* Mantém o highlight laranja se necessário no design, a cor base do título é branca agora */}
          </Title>
          {/* Subtítulo principal - Corrigido texto e fonte (Inter Normal) */}
          <Paragraph className="solutions-main-subtitle">
            De forma modular, escalável e intuitiva.
          </Paragraph>
          {/* Título da subseção - Corrigido texto, cor agora branca via CSS */}
          <Title level={3} className="solutions-subsection-title">Áreas de atuação e Dashboards de performance</Title>
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
                {/* Título e Subtítulo do Card - Cores definidas no CSS */}
                <Title level={4} className="solution-card-title">
                  {solution.title}
                  {solution.subtitle && <span className="solution-card-subtitle-tag">{solution.subtitle}</span>}
                </Title>
                 {/* Descrição do Card - Cor definida no CSS */}
                <Paragraph className="solution-card-description">{solution.description}</Paragraph>
                {/* REMOVIDO: Seta no canto inferior direito */}
                {/* <RightCircleOutlined className="solution-card-arrow" /> */}
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
                    {/* Título e Subtítulo do Card Alt - Cores definidas no CSS */}
                    <Title level={4} className="solution-card-alt-title">{solution.title}</Title>
                    {solution.subtitle && <Text className="solution-card-alt-subtitle">{solution.subtitle}</Text>}
                     {/* Descrição do Card Alt - Cor definida no CSS */}
                    <Paragraph className="solution-card-alt-description">{solution.description}</Paragraph>
                 </div>
                 {/* REMOVIDO: Seta no canto inferior direito */}
                 {/* <ArrowRightOutlined className="solution-card-alt-arrow" /> */}
              </div>
            </div>
          ))}
        </div>


        <div ref={ctaRef} className="solutions-cta-block animation-target-solutions">
          {/* CTA text - Corrigido texto, fonte Nasalization, cor branca via CSS */}
          <Paragraph className="solutions-cta-text Nasalization-font">
            Qual destas áreas podemos <span className="highlight-orange-sol">começar a transformar</span> consigo?
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default SolutionsOverviewSection;