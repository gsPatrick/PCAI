// src/components/ProductVideoSection/ProductVideoSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Button, Tooltip } from 'antd';
import { SoundOutlined, MutedOutlined, PlayCircleOutlined, PauseCircleOutlined, ExpandOutlined, ShrinkOutlined } from '@ant-design/icons';
import './ProductVideoSection.css';

import localVideo from '../../assets/media/video.mp4';
// Importe o backgroundAzul.png
import backgroundAzul from '../../assets/images/backgroundAzul.png';


const { Title, Paragraph } = Typography;

const ProductVideoSection = () => {
  const [animateContent, setAnimateContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          currentSectionRef.classList.add('video-section-bg-active'); // Ativa animações de fundo
          setAnimateContent(true); // Ativa animações de conteúdo (texto, player)
          
          if (videoRef.current) {
            videoRef.current.play().catch(error => {
              console.warn("Autoplay com som bloqueado.", error);
            });
          }
          observer.unobserve(currentSectionRef);
        }
      },
      { threshold: 0.15 } // Um pouco mais de visibilidade para iniciar tudo
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  // Lógica do player (mesma da versão anterior, apenas adaptando nomes de classes se necessário)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updatePlayState = () => setIsPlaying(!video.paused);
    const updateMuteState = () => setIsMuted(video.muted);
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const setVideoDuration = () => {
        if (video.duration && !isNaN(video.duration)) {
            setDuration(video.duration);
        }
    };
    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);
    video.addEventListener('ended', updatePlayState);
    video.addEventListener('volumechange', updateMuteState);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', setVideoDuration);
    video.muted = isMuted;
    return () => {
      video.removeEventListener('play', updatePlayState);
      video.removeEventListener('pause', updatePlayState);
      video.removeEventListener('ended', updatePlayState);
      video.removeEventListener('volumechange', updateMuteState);
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', setVideoDuration);
    };
  }, [isMuted]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  const handleProgressChange = (e) => {
    if (videoRef.current && duration) {
      const newTime = (e.target.value / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0 || !isFinite(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const toggleFullScreen = () => {
    const elem = videoContainerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };
  useEffect(() => {
    const handleFullScreenChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="product-video-section-wrapper rich-bg-video-player"
      style={{ backgroundImage: `url(${backgroundAzul})` }} // Aplicando o backgroundAzul
    >
      <div className="video-section-overlay-rich"></div> {/* Overlay para contraste */}

      {/* Elementos Gráficos de Fundo Adicionais */}
      <div className="video-rich-graphic graphic-ring-1"></div>
      <div className="video-rich-graphic graphic-ring-2"></div>
      <div className="video-rich-graphic graphic-plus-pattern">
        {[...Array(10)].map((_,i)=><div className="plus-shape" key={i} style={{animationDelay: `${Math.random() * 2}s`}}>+</div>)}
      </div>
      <div className="video-rich-graphic graphic-accent-line-video"></div>


      <Row justify="center" className={`product-video-header-row-rich ${animateContent ? 'content-visible' : ''}`}>
        <Col xs={22} sm={20} md={18} lg={16} xl={14} className="product-video-text-content-rich">
          <Title level={1} className="product-video-title-rich">
            Veja a Inovação em <span className="highlight-video">Ação.</span>
          </Title>
          <Paragraph className="product-video-description-rich">
            Uma demonstração clara de como nossa IA humanizada transforma desafios em oportunidades reais e resultados tangíveis.
          </Paragraph>
        </Col>
      </Row>

      <Row justify="center" className="video-player-row-rich">
        <Col xs={23} sm={22} md={20} lg={18} xl={16}>
          <div ref={videoContainerRef} className={`video-player-outer-container-rich ${animateContent ? 'content-visible' : ''}`}>
            <div className="video-player-frame-decoration"></div> {/* Moldura decorativa */}
            <div className="video-aspect-ratio-keeper-rich">
              <video
                ref={videoRef}
                src={localVideo}
                className="main-product-video-rich"
                onClick={togglePlayPause}
                muted
                playsInline
                loop
              >
                Seu navegador não suporta a tag de vídeo.
              </video>
            </div>

            <div className={`video-controls-overlay-rich ${isPlaying ? 'is-playing' : ''} ${!animateContent ? 'controls-initially-hidden' : ''}`}>
              <div className="progress-bar-wrapper-rich">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="video-progress-bar-rich"
                  style={{ background: `linear-gradient(to right, var(--video-rich-accent-orange) ${progress}%, var(--video-rich-progress-track) ${progress}%)` }}
                />
              </div>
              <div className="controls-main-bar-rich">
                <div className="controls-group-left-rich">
                  <Tooltip title={isPlaying ? "Pausar" : "Reproduzir"}>
                    <Button icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={togglePlayPause} type="text" className="control-btn-rich"/>
                  </Tooltip>
                  <Tooltip title={isMuted ? "Ativar Som" : "Desativar Som"}>
                    <Button icon={isMuted ? <MutedOutlined /> : <SoundOutlined />} onClick={toggleMute} type="text" className="control-btn-rich"/>
                  </Tooltip>
                </div>
                <div className="video-time-display-rich">
                  {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                </div>
                <div className="controls-group-right-rich">
                   <Tooltip title={isFullScreen ? "Sair da Tela Cheia" : "Tela Cheia"}>
                    <Button icon={isFullScreen ? <ShrinkOutlined /> : <ExpandOutlined />} onClick={toggleFullScreen} type="text" className="control-btn-rich"/>
                  </Tooltip>
                </div>
              </div>
            </div>
             <button onClick={togglePlayPause} className={`center-play-pause-button-rich ${!isPlaying && animateContent ? 'visible' : ''} ${videoRef.current?.ended ? 'ended' : ''}`} aria-label={isPlaying ? "Pausar" : "Reproduzir"}>
                <PlayCircleOutlined />
             </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductVideoSection;