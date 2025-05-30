// src/components/ProductVideoSection/ProductVideoSection.jsx
import React, { useEffect, useRef } from 'react';
// Remover imports de Typography e Button
// import { Row, Col, Typography, Button } from 'antd';
// Remover imports de ícones de controle de player, manter apenas o da seta
import { ArrowDownOutlined } from '@ant-design/icons';
import './ProductVideoSection.css'
import ReactPlayer from 'react-player/youtube';
;

// Importar a imagem de background, mesmo que seja para um overlay ou detalhe futuro
// import backgroundAzul from '../../assets/images/backgroundAzul.png';


// Remover Title e Paragraph já que não haverá texto principal
// const { Title, Paragraph } = Typography;


const ProductVideoSection = () => {
  // Remover todos os states de controle de player
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isMuted, setIsMuted] = useState(true);
  // const [showOverlayButton, setShowOverlayButton] = useState(true);

  // Manter apenas a referência do vídeo e da seção
  const videoRef = useRef(null); // Referência para o player
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          currentSectionRef.classList.add('video-section-active'); // Ativa animações da seção e gráficos de fundo

          // Não é mais necessário forçar o play/mute via JS aqui,
          // o componente ReactPlayer com playing={true}, loop={true} e muted={true}
          // deve lidar com isso automaticamente assim que estiver pronto e visível.
          // A única exceção é o autoplay bloqueado por políticas do navegador,
          // que só permitirá autoplay mutado.

          observer.unobserve(currentSectionRef); // Observa apenas uma vez
        }
         // Remover a lógica de pausar ao sair da viewport
      },
      { threshold: 0.1 } // Um pouco mais de visibilidade para iniciar tudo
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    // Limpar o observer ao desmontar
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
       // Parar o player ao desmontar (opcional, mas boa prática)
       if (videoRef.current && videoRef.current.getInternalPlayer) {
            const player = videoRef.current.getInternalPlayer();
            if (player && player.stopVideo) { // Para YouTube
                player.stopVideo();
            }
       }
    };
  }, []);


  // Remover handlers de player (handlePlayerReady, handlePlay, handlePause, handleEnded, handleButtonClick)


return (
    // Remover a imagem de background inline se ela for mais usada como BG principal
    // <div ref={sectionRef} className="product-video-section-wrapper hero-video-bg" style={{ backgroundImage: `url(${backgroundAzul})` }}>
    <div
        id="video" // Adicionado o ID "video" aqui
        ref={sectionRef}
        className="product-video-section-wrapper hero-video-bg"
    >
      {/* Overlay para escurecer o vídeo */}
      <div className="video-background-overlay"></div>


      {/* Container para o vídeo que vai cobrir a seção */}
      <div className="video-player-cover-container">
          <ReactPlayer
            ref={videoRef}
            // Manter o URL do seu vídeo do YouTube
            url="https://www.youtube.com/watch?v=u31qwQUeGuM"
            className="react-player" // Classe para estilizar
            width="100%"
            height="100%"
            playing={true} // Toca automaticamente SEMPRE
            loop={true} // Em loop SEMPRE
            muted={true} // SEMPRE mutado para autoplay funcionar
            controls={false} // Esconde os controles nativos
            // Remover todos os listeners de eventos e onClick
            // onReady={handlePlayerReady}
            // onPlay={handlePlay}
            // onPause={handlePause}
            // onEnded={handleEnded}
            // onClick={togglePlayPause} // Não há mais toggleClick
             config={{
                 youtube: {
                     playerVars: { showinfo: 0, rel: 0, loop: 1, playlist: 'u31qwQUeGuM', controls: 0 } // Configurações YouTube: sem info, sem relacionados, loop, playlist com o mesmo ID para loop funcionar corretamente, controls: 0 para garantir que os controles do YouTube não apareçam NUNCA
                 }
             }}
          />
      </div>

      {/* Elementos Gráficos de Fundo Adicionais - Z-index ajustado */}
      {/* Mantendo apenas os gráficos que fazem sentido como fundo */}
      <div className="video-bg-graphic graphic-ring-1"></div>
      <div className="video-bg-graphic graphic-ring-2"></div>


      {/* Remover o Botão central de Play/Unmute/Pause */}
      {/*
       <Button
          type="primary"
          shape="circle"
          size="large"
          className={`center-play-mute-button ${showOverlayButton ? 'visible' : ''}`}
          icon={renderButtonIcon()}
          onClick={handleButtonClick}
          aria-label={isMuted ? "Reproduzir e Desmutar Vídeo" : isPlaying ? "Pausar Vídeo" : "Reproduzir Vídeo"}
       />
       */}

        {/* Indicador de Scroll - Manter e estilizar */}
        <div className="scroll-indicator">
            <ArrowDownOutlined className="scroll-arrow" />
        </div>

    </div>
  );
};

export default ProductVideoSection;