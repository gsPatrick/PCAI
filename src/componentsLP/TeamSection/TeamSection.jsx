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
  const sectionRef = useRef(null);
  const memberRefs = useRef(teamMembersData.map(() => React.createRef()));

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentMemberRefs = memberRefs.current;

    const sectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        currentSectionRef.classList.add('team-section-visible');
        sectionObserver.unobserve(currentSectionRef);
      }
    }, { threshold: 0.1 });

    if (currentSectionRef) {
      sectionObserver.observe(currentSectionRef);
    }

    const memberObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('team-member-visible');
          memberObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    currentMemberRefs.forEach(ref => {
      if (ref.current) {
        memberObserver.observe(ref.current);
      }
    });

    return () => {
      if (currentSectionRef) sectionObserver.unobserve(currentSectionRef);
      currentMemberRefs.forEach(ref => {
        if (ref.current) memberObserver.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="team-section-wrapper"
      style={{ backgroundImage: `url(${backgroundCinza})` }} // Aplicando a imagem de fundo
    >
      <div className="team-section-content-area">
        <Row className="team-header-row">
          <Col>
            <Text className="team-section-tagline">Quem somos | Co-Founders</Text>
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

        <Row className="team-footer-row">
          <Col>
            <Text className="team-footer-brand-text">PEOPLE CHANGE AI CONSULTING</Text>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TeamSection;