import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography } from 'antd';
import {
    LineChartOutlined,
    BulbOutlined,
    SafetyCertificateOutlined,
    UserOutlined
} from '@ant-design/icons';
import './ExpectedBenefitsSection.css';

// Importar a nova imagem de fundo
import backgroundCinza from '../../assets/images/backgroundCinza.png';


const { Title, Paragraph, Text } = Typography;

const benefitsData = [
  {
    id: 'efficiency',
    icon: <LineChartOutlined />,
    title: "Eficiência Operacional e Redução de Custos",
    description: "Maximizamos a produtividade, minimizamos desperdícios e fortalecemos resultados financeiros.",
    color: "var(--benefit-vibrant-color-1, #EF7C12)",
  },
  {
    id: 'decisions',
    icon: <BulbOutlined />,
    title: "Decisões Estratégicas Aprimoradas",
    description: "Utilizamos análise de dados para fornecer insights que aprimoram decisões de negócio.",
    color: "var(--benefit-vibrant-color-2, #3B82F6)",
  },
  {
    id: 'resilience',
    icon: <SafetyCertificateOutlined />,
    title: "Resiliência Organizacional",
    description: "Preparamos empresas para o presente e futuro, tornando-as mais adaptáveis e preparadas.",
    color: "var(--benefit-vibrant-color-3, #10B981)",
  },
  {
    id: 'ux',
    icon: <UserOutlined />,
    title: "Experiência do Utilizador Aprimorada",
    description: "Criamos soluções adaptadas às necessidades reais dos utilizadores, melhorando performance e satisfação.",
    color: "var(--benefit-vibrant-color-4, #8B5CF6)",
  },
];

// Mantendo apenas os primeiros 4 para esta seção
const benefitsCardsData = benefitsData.slice(0, 4);


const ExpectedBenefitsSection = () => {
  const sectionRef = useRef(null);
   // Ref para o novo título padronizado
  const standardTitleRef = useRef(null);
  const textContentRef = useRef(null);
  const benefitCardRefs = useRef(benefitsCardsData.map(() => React.createRef())); // Ajustado para usar benefitsCardsData

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
     // Observar o novo título padronizado, o bloco de texto e os cards
    const targetsToObserve = [
        standardTitleRef.current, // Novo target
        textContentRef.current,
        ...benefitCardRefs.current.map(ref => ref.current)
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('benefit-item-active-vibrant');
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
            currentSectionRef.classList.add('benefits-section-activated-vibrant');
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
      id="benefits" // ID para linkagem do header
      ref={sectionRef}
      className="expected-benefits-section-wrapper vibrant-design"
      style={{ backgroundImage: `url(${backgroundCinza})` }} // Aplicando a imagem de fundo
    >
        {/* Elementos gráficos de fundo */}
        <div className="benefit-v-graphic graphic-swirl-1"></div>
        <div className="benefit-v-graphic graphic-blob-2"></div>
        <div className="benefit-v-graphic graphic-dots-floating">
            {[...Array(8)].map((_,i) => <div key={i} className="float-dot" style={{animationDelay: `${i * 0.3}s`}}></div>)}
        </div>


        <div className="expected-benefits-content-area-vibrant">

             {/* NOVO: Título Padronizado "As Soluções | Benefícios Esperados" */}
             {/* Usando a mesma classe de animação que outros elementos para o Observer */}
            <Row ref={standardTitleRef} className="section-standard-title-row animation-target-benefits-vibrant">
              <Col>
                <Text className="section-standard-title-text">
                  As Soluções | <span className="section-standard-title-current">Benefícios Esperados</span> {/* Texto do título padronizado */}
                </Text>
              </Col>
            </Row>


            <Row gutter={[64, 64]} align="center"> {/* Aumentado gutter vertical */}
                <Col xs={24} lg={10} className="benefits-text-column-vibrant">
                    {/* Ref no bloco de texto para animação */}
                    <div ref={textContentRef} className="benefits-text-block-vibrant animation-target-benefits-vibrant">
                        <Title level={1} className="benefits-main-heading-vibrant">
                            Transformando <span className="highlight-vibrant">Potencial</span> em <span className="highlight-vibrant">Performance</span> Excepcional
                        </Title>
                        <Paragraph className="benefits-paragraph-vibrant">
                            Unimos o melhor da tecnologia com a inteligência humana para criar soluções que ampliam capacidades, elevam o bem-estar e fortalecem o futuro dos negócios.
                        </Paragraph>
                        <Paragraph className="benefits-paragraph-vibrant">
                            Garantimos que a tecnologia funciona como um aliado das pessoas, e não como um substituto.
                        </Paragraph>
                        <Paragraph className="benefits-paragraph-vibrant strong-emphasis-vibrant">
                            Em tudo o que fazemos, acrescentamos sensibilidade e propósito:
                        </Paragraph>
                        {/* Frase da citação com fonte Nazalization */}
                        <Paragraph className="benefits-quote-vibrant">
                            <span className="nazalization-font"> {/* Aplica a classe Nazalization apenas na frase */}
                                A IA deve compreender não apenas o que é dito — <span className="highlight-quote-vibrant">mas também como é sentido.</span>
                            </span>
                        </Paragraph>
                        <Text className="benefits-section-footer-vibrant">PEOPLE CHANGE AI CONSULTING</Text>
                    </div>
                </Col>

                {/* Coluna com os 4 Cards */}
                <Col xs={24} lg={14} className="benefits-cards-area-vibrant">
                    <div className="benefits-cards-grid-vibrant">
                        {benefitsCardsData.map((benefit, index) => ( // Usando benefitsCardsData (slice 0-3)
                            <div
                                key={benefit.id}
                                ref={benefitCardRefs.current[index]}
                                className={`benefit-card-vibrant animation-target-benefits-vibrant card-${benefit.id}`}
                                // Delay para stagger dos cards, inicia APÓS o textContentBlock
                                style={{ '--benefit-card-accent': benefit.color, transitionDelay: `${0.3 + index * 0.18}s` }}
                            >
                                <div className="card-vibrant-icon-bg">
                                    {benefit.icon}
                                </div>
                                <div className="card-vibrant-content">
                                    <Title level={3} className="card-vibrant-title">{benefit.title}</Title>
                                    <Paragraph className="card-vibrant-description">{benefit.description}</Paragraph>
                                </div>
                                <div className="card-vibrant-decoration"></div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  );
};

export default ExpectedBenefitsSection;