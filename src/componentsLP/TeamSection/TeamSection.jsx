// src/components/TeamSection/TeamSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, Avatar } from 'antd'; // Usaremos Avatar para as imagens circulares
import './TeamSection.css';

// Importe as imagens dos membros da equipe
import marcoImg from '../../assets/images/marco.png';
import hugoImg from '../../assets/images/hugo.png';
// Importar a nova imagem de fundo
import backgroundCinza from '../../assets/images/backgroundCinza.png';


const { Title, Paragraph, Text } = Typography;

const teamMembersData = [
  {
    key: 'marco',
    nameFirst: 'Marco',
    nameLast: 'Almas',
    image: marcoImg,
    description: [
      'Especialista em Gestão Humana e Inovação.',
      'Futurista apaixonado por tecnologia humanizada.',
      'Speaker e mentor na capacitação de equipas para o futuro ético da inovação e do talento humano.'
    ],
  },
  {
    key: 'hugo',
    nameFirst: 'Hugo',
    nameLast: 'Gripa',
    image: hugoImg,
    description: [
      'Consultor de Inovação e Estratégia Tecnológica.',
      'Especialista em Design Thinking, Experiência do Utilizador e Transformação Digital.',
      'Mestre em Antropologia do Consumo, focado na criação de experiências centradas no ser humano.'
    ],
  },
];

const TeamSection = () => {
  const sectionRef = useRef(null); // Manter o ref para a seção principal, embora o observer de wrapper tenha sido removido
  // Ref para o novo título padronizado
  const standardTitleRef = useRef(null);
  const memberRefs = useRef(teamMembersData.map(() => React.createRef()));
   // Ref para o footer row (já existia no CSS, adicionado ref no JSX)
  const footerRef = useRef(null);

  useEffect(() => {
    // const currentSectionRef = sectionRef.current; // Removido, não usado pelo observer principal

    // A lista de elementos a serem observados (título padronizado, colunas dos membros, footer)
    const elementsToObserve = [
        standardTitleRef.current, // Título padronizado
        footerRef.current, // Footer row
        ...memberRefs.current.map(ref => ref.current), // Colunas dos membros
    ].filter(Boolean); // Filtra refs nulos caso algum elemento não exista


    // NOVO OBSERVER ÚNICO para o título, membros e footer
    const contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adiciona a nova classe de visibilidade
            entry.target.classList.add('team-item-visible-new');
            // Configura o delay da transição baseado no atributo data-delay
             const delay = parseFloat(entry.target.dataset.delay || '0');
             entry.target.style.transitionDelay = `${delay}s`;

            // Para de observar este elemento depois que ele aparece
            contentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 } // Ajustado threshold para os elementos aparecerem um pouco antes
    );

    // Observa todos os elementos da lista
    elementsToObserve.forEach(el => {
        if(el) contentObserver.observe(el);
    });


    // REMOVIDO: O sectionObserver que controlava a animação do wrapper e das classes team-header-row/team-footer-row
    /*
    const sectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        currentSectionRef.classList.add('team-section-visible');
        sectionObserver.unobserve(currentSectionRef);
      }
    }, { threshold: 0.1 });

    if (currentSectionRef) {
      sectionObserver.observe(currentSectionRef);
    }
    */


    return () => {
      // Limpeza: Para de observar todos os elementos observados pelo contentObserver
       elementsToObserve.forEach(el => {
           if(el) contentObserver.unobserve(el);
       });
      // REMOVIDO: Limpeza do sectionObserver
      /*
      if (currentSectionRef && sectionObserver) {
        sectionObserver.unobserve(currentSectionRef);
      }
      */
    };
  }, []); // Dependências vazias para executar apenas uma vez

  return (
    // O ID para linkagem do header será removido ou alterado na LandingPage quando a estrutura for consolidada,
    // mas mantemos o ref para o observer.
    <div
      ref={sectionRef}
      className="team-section-wrapper"
      style={{ backgroundImage: `url(${backgroundCinza})` }} // Aplicando a imagem de fundo
    >
      <div className="team-section-content-area">

        {/* REMOVIDO: A Row antiga do header/tagline */}
        {/* <Row className="team-header-row">
          <Col>
            <Text className="team-section-tagline">Quem somos | Co-Founders</Text>
          </Col>
        </Row> */}

        {/* NOVO: TÍTULO PADRONIZADO "Quem somos | Co-Founders" */}
        {/* Adicionado ref e data-delay para o observer */}
        <Row ref={standardTitleRef} className="section-standard-title-row" data-delay="0.1">
          <Col>
            <Text className="section-standard-title-text">
              <span className="section-standard-title-current">Co-Founders</span> {/* Texto do título padronizado */}
            </Text>
          </Col>
        </Row>


        <Row gutter={{ xs: 32, sm: 40, md: 60, lg: 80 }} justify="center" className="team-members-row">
          {teamMembersData.map((member, index) => (
            <Col
              key={member.key}
              xs={24} // Ocupa 100% em telas pequenas
              sm={12} // Duas colunas em telas médias
              md={11} // Ajuste fino para md
              lg={10} // Ajuste fino para lg
              className="team-member-col"
              ref={memberRefs.current[index]}
              data-delay={0.3 + index * 0.15} // Adiciona data-delay para stagger nos membros
            >
              <div className="team-member-card">
                <div className="member-image-wrapper">
                  <Avatar
                    size={140} // Tamanho da imagem circular, pode ajustar
                    src={member.image}
                    alt={`${member.nameFirst} ${member.nameLast}`}
                    className="member-avatar"
                  />
                </div>
                <div className="member-info">
                  <Title level={2} className="member-name-first">{member.nameFirst}</Title>
                  <Title level={2} className="member-name-last">{member.nameLast}</Title>
                  <div className="member-description-list">
                    {member.description.map((desc, i) => (
                      <Paragraph key={i} className="member-description-item">
                        {desc}
                      </Paragraph>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

         {/* Adicionado ref e data-delay para o footer row */}
        <Row ref={footerRef} className="team-footer-row" data-delay={0.3 + teamMembersData.length * 0.15 + 0.2}> {/* Delay após o último membro + buffer */}
          <Col>
            <Text className="team-footer-brand-text">PEOPLE CHANGE AI CONSULTING</Text>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TeamSection;