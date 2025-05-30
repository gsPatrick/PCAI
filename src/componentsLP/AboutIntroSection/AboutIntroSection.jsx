// src/components/AboutIntroSection/AboutIntroSection.jsx
import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography } from 'antd';
import './AboutIntroSection.css';

import bgAzul from '../../assets/images/backgroundAzul.png';
// Importar o novo GIF
import bola2Gif from '../../assets/images/bola3.gif';


const { Title, Paragraph, Text } = Typography;

const AboutIntroSection = () => {
  const sectionRef = useRef(null);
  // Ref para o novo título padronizado
  const standardTitleRef = useRef(null);
  const contentRef = useRef(null);
  const organicImageRef = useRef(null); // Ref para o wrapper do GIF

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    // Observar o novo título padronizado, o bloco de texto e o wrapper da imagem
    const targetsToObserve = [
        standardTitleRef.current, // Novo target
        contentRef.current,
        organicImageRef.current
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adiciona a classe de animação aos targets
            entry.target.classList.add('animate-item-in-view');
            // Para o IntersectionObserver do elemento individual após animar
            if (targetsToObserve.includes(entry.target)) {
                 observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 } // Reduzido para a animação de entrada da imagem começar um pouco antes
    );

    targetsToObserve.forEach(target => {
      if (target) observer.observe(target);
    });

    // Observer para adicionar a classe 'section-active-intro' quando a seção entra na viewport
    // Isso ativa o parallax e as animações contínuas (se houver)
    let sectionEntryObserver;
    if (currentSectionRef) {
        sectionEntryObserver = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
              currentSectionRef.classList.add('section-active-intro');
              // Adiciona o listener de scroll APENAS quando a seção está ativa
              window.addEventListener('scroll', handleScroll, { passive: true });
              sectionEntryObserver.unobserve(currentSectionRef); // Para de observar após ativar
          } else {
              // Opcional: remover a classe se a seção sair completamente da viewport
              // currentSectionRef.classList.remove('section-active-intro');
              // window.removeEventListener('scroll', handleScroll); // Remover listener se sair (pode ser muito agressivo)
          }
        }, { threshold: 0.01 }); // Ativa assim que uma pequena parte da seção fica visível

        sectionEntryObserver.observe(currentSectionRef);
    }

    // Função de Parallax - aplica translateY no wrapper do GIF
    const handleScroll = () => {
      if (organicImageRef.current && currentSectionRef && currentSectionRef.classList.contains('section-active-intro')) {
        const sectionRect = currentSectionRef.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calcula a posição do meio da seção relativa ao meio da viewport
        const sectionMidpoint = sectionRect.top + sectionRect.height / 2;
        const viewportMidpoint = viewportHeight / 2;
        const distanceFromViewportMid = sectionMidpoint - viewportMidpoint;

        // Queremos que o parallax seja baseado na posição da seção na viewport
        // O offset será 0 quando o centro da seção estiver no centro da viewport.
        // Será negativo quando a seção estiver acima do centro e positivo quando estiver abaixo.
        const parallaxIntensity = 0.3; // Ajuste este valor para controlar a intensidade

        // Inverte o cálculo para que o objeto suba quando a seção desce (scroll para baixo)
        let parallaxOffset = -distanceFromViewportMid * parallaxIntensity;

        // Limitar o offset para evitar movimentos muito grandes
        const maxParallax = 80; // Limite máximo de deslocamento do parallax em px
        parallaxOffset = Math.max(-maxParallax, Math.min(maxParallax, parallaxOffset));

        organicImageRef.current.style.setProperty('--parallax-offset-y', `${parallaxOffset}px`);
      }
    };


    return () => {
      targetsToObserve.forEach(target => {
        if (target) observer.unobserve(target);
      });
      if (sectionEntryObserver && currentSectionRef) {
          sectionEntryObserver.unobserve(currentSectionRef);
      }
      // Garante que o listener de scroll é removido ao desmontar
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Dependências vazias para executar apenas uma vez ao montar

  return (
    <div
      ref={sectionRef}
      className="about-intro-section-wrapper"
      style={{ backgroundImage: `url(${bgAzul})` }} // Mantém o backgroundAzul
    >
      <div className="about-intro-overlay"></div>

      {/* Partículas animadas de fundo (mantidas) */}
      {[...Array(10)].map((_, i) => ( // Aumentei o número de partículas
          <div
              key={i}
              className={`particle p${(i % 5) + 1}`} // Reutiliza as classes de tamanho/velocidade
              style={{
                width: `${Math.random() * 3 + 2}px`, // Tamanho aleatório entre 2 e 5px
                height: `${Math.random() * 3 + 2}px`,
                top: `${Math.random() * 100}%`,      // Posição vertical aleatória
                left: `${Math.random() * 100}%`,     // Posição horizontal aleatória
                animationDuration: `${Math.random() * 10 + 15}s`, // Duração da animação aleatória (15 a 25s)
                animationDelay: `${Math.random() * -15}s`,      // Delay negativo para iniciar em diferentes fases
                backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.08 + 0.02})` // Opacidade e cor sutis
              }}
          ></div>
      ))}

      <div className="about-intro-content-area">

        {/* NOVO: Título Padronizado "Quem somos | Introdução" */}
         <Row ref={standardTitleRef} className="section-standard-title-row animation-target-intro"> {/* Usando a classe de animação existente */}
           <Col>
             <Text className="section-standard-title-text">
               Quem somos | <span className="section-standard-title-current-azul">Introdução</span>
             </Text>
           </Col>
         </Row>


        {/* REMOVIDO A TAGLINE ANTIGA */}
        {/* <Title level={4} className="section-tagline-about">Quem somos</Title> */}

        <Row gutter={[64, 48]} align="middle" className="about-intro-row"> {/* Gutter horizontal maior */}
          <Col xs={24} lg={13} xl={12} className="about-text-column"> {/* Coluna de texto um pouco mais estreita em telas grandes */}
            <div ref={contentRef} className="text-content-block animation-target-intro"> {/* Ref no bloco de texto */}
              <Paragraph className="main-paragraph-about">
                A <strong className="company-name-highlight">People Change AI Consulting</strong> nasceu para
                redefinir a relação entre tecnologia e humanidade.
              </Paragraph>
              <Paragraph className="secondary-paragraph-about">
                Não inovamos por inovar: criamos soluções que ampliam
                o talento, protegem a dignidade e potenciam o
                crescimento humano nas organizações.
              </Paragraph>
              <Paragraph className="emphasis-paragraph-about">
                Tecnologia ao serviço das pessoas. <span className="emphasis-always">Sempre.</span>
              </Paragraph>
            </div>
          </Col>

          <Col xs={24} lg={11} xl={12} className="about-shape-column"> {/* Coluna da imagem/GIF ganha mais espaço */}
            {/* O ref e a classe animation-target-intro vão no wrapper */}
            <div ref={organicImageRef} className="organic-image-wrapper animation-target-intro">
              <img
                src={bola2Gif} // Usando o GIF importado
                alt="Forma orgânica da People Change AI"
                className="organic-image-element" // A classe continua a mesma
              />
            </div>
          </Col>
        </Row>

        <Row className="about-footer-row animation-target-intro">
          <Col>
            <Text className="about-footer-brand-text">PEOPLE CHANGE AI CONSULTING</Text>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutIntroSection;