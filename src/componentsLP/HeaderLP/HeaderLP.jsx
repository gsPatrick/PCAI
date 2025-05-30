// src/componentsLP/HeaderLP/HeaderLP.jsx
import React, { useState, useEffect, useRef } from 'react'; // Importar useRef
import { Layout, Row, Col, Typography, Menu, Image, Button, Drawer } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import './HeaderLP.css';

// Importar as novas imagens
import logoLaranjaImage from '../../assets/images/logocompletolaranja.png'; // A nova logo laranja
import backgroundCinzaImage from '../../assets/images/backgroundCinza.png'; // O novo background cinza

const { Header } = Layout;
const { Title, Text } = Typography;

const menuItems = [
  { key: 'quem-somos', label: 'Quem Somos', path: '#video' }, // Usar fragmentos para links internos
  { key: 'solucoes', label: 'As Soluções', path: '#solutions' }, // Alterado
  { key: 'diferencial', label: 'O Nosso Diferencial', path: '#diferencial' }, // Alterado
  { key: 'compromisso', label: 'Compromisso Ético', path: '#ethical-commitment' }, // Alterado
  { key: 'contato', label: 'Contactos', path: '#contact' }, // Alterado
  // Nota: 'Benefícios Esperados' não estava na lista original do Header, será adicionado agora
  // Inserindo na posição lógica após 'As Soluções'
  { key: 'beneficios', label: 'Benefícios Esperados', path: '#benefits' }, // Novo item
];

// Reordenar o array para a ordem desejada
const orderedMenuItems = [
    menuItems.find(item => item.key === 'quem-somos'),
    menuItems.find(item => item.key === 'o-nosso-diferencial'), // Chave pode ser 'diferencial' ou 'o-nosso-diferencial' - mantendo 'diferencial'
    menuItems.find(item => item.key === 'solucoes'),
    menuItems.find(item => item.key === 'beneficios'), // Novo item
    menuItems.find(item => item.key === 'compromisso'),
    menuItems.find(item => item.key === 'contato'), // Chave pode ser 'contato' ou 'contactos' - mantendo 'contato'
].filter(Boolean); // Remove itens que não foram encontrados (se houver algum erro na chave)


const HeaderLP = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const headerRef = useRef(null); // Ref para o header

  useEffect(() => {
    const currentHeaderRef = headerRef.current;
        // Observer para animar o header quando a página carrega ou rola para o topo
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                currentHeaderRef.classList.add('header-lp-visible'); // Classe para iniciar animação
                observer.unobserve(entry.target); // Parar de observar depois de aparecer
              }
            });
          },
          { threshold: 0.1 } // Pode ajustar o threshold se precisar
        );

        if (currentHeaderRef) {
          observer.observe(currentHeaderRef);
        }

        return () => {
          if (currentHeaderRef) {
            observer.unobserve(currentHeaderRef);
          }
        };
    }, []); // Executa apenas uma vez no mount


  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

    // Helper para scroll suave para os fragmentos (âncoras)
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        closeDrawer(); // Fecha o drawer após clicar no link
    };


  // Determina a chave do menu ativo baseado no scroll e IDs das seções
    // Implementação mais complexa para scroll spy, vamos manter simples por enquanto
    // e focar na navegação de fragmentos. O AntD Menu pode não realçar nativamente fragmentos.
    // Por enquanto, não haverá realce dinâmico do menu com base no scroll.
  const getCurrentSelectedKey = () => {
      // Se estiver na raiz, realça o primeiro item (Início, se houver)
      if (window.location.pathname === '/' && window.location.hash === '') {
          return orderedMenuItems.length > 0 ? [orderedMenuItems[0].key] : [];
      }
      // Lógica mais complexa de scroll spy seria necessária aqui
      return []; // Nenhum item realçado por padrão com links de fragmento
  };


  return (
    <>
      <Header
        ref={headerRef} // Adicionar o ref ao header
        className="header-lp" // Remover a classe "fade-in", animação agora pelo ref
        style={{ backgroundImage: `url(${backgroundCinzaImage})` }} // Aplicar a nova imagem de fundo
      >
        {/* Overlay para escurecer o fundo */}
        <div className="header-background-overlay"></div>

        <Row justify="space-between" align="middle" className="header-row">
          <Col className="logo-area">
            {/* NOVO: Logo Laranja no lugar da antiga logo e nome */}
            {/* Link para a seção Hero (assumindo ID "hero-section") */}
            <a id="hero-section" href="#hero-section" className="logo-link" onClick={(e) => {
                 e.preventDefault(); // Previne o comportamento padrão do link
                 scrollToSection('hero-section'); // Rola suavemente
             }}>
               <Image
                 src={logoLaranjaImage}
                 alt="People Change Logo Laranja" // Novo Alt Text
                 className="logo-img-orange" // Nova classe para estilos específicos da logo laranja
                 preview={false}
               />
               {/* NOME DA EMPRESA REMOVIDO */}
               {/* <div className="company-name-container">
                 <Title level={4} className="company-name-main">
                   PEOPLE CHANGE
                 </Title>
                 <Text className="company-name-ai">
                   <span className="ai-highlight">{'<AI>'}</span> CONSULTING
                 </Text>
               </div> */}
             </a>
          </Col>

          {/* Menu para Desktop */}
          <Col className="menu-desktop">
            <Menu
              mode="horizontal"
              // selectedKeys={getCurrentSelectedKey()} // Desativado realce dinâmico
              className="header-menu"
            >
              {orderedMenuItems.map((item) => (
                <Menu.Item key={item.key} className="header-menu-item">
                  {/* Usar tags 'a' ou Link AntD com onClick para scroll suave */}
                   <a href={item.path} onClick={(e) => {
                       e.preventDefault(); // Previne o comportamento padrão do link
                       const id = item.path.substring(1); // Remove o #
                       scrollToSection(id); // Rola suavemente
                   }}>
                       {item.label}
                   </a>
                </Menu.Item>
              ))}
            </Menu>
          </Col>

          {/* Botão Hambúrguer para Mobile */}
          <Col className="menu-mobile-button">
            <Button
              className="hamburger-button"
              type="text"
              icon={<MenuOutlined />}
              onClick={showDrawer}
            />
          </Col>
        </Row>
      </Header>

      {/* Drawer para Menu Mobile */}
      <Drawer
        title={
          // NOVO: Logo Laranja no Drawer
           <a href="#hero-section" onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero-section');
              closeDrawer();
          }} className="drawer-logo-link">
            <Image src={logoLaranjaImage} alt="Logo" style={{ height: '40px'}} preview={false} /> {/* Ajuste tamanho se necessário */}
             {/* NOME DA EMPRESA REMOVIDO DO DRAWER */}
             {/* <div className="company-name-container-drawer">
                <span className="company-name-main-drawer">PEOPLE CHANGE</span>
                <span className="company-name-ai-drawer">
                  <span className="ai-highlight-drawer">{'<AI>'}</span> CONSULTING
                </span>
              </div> */}
          </a>
        }
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        className="menu-drawer"
        closable={true}
      >
        <Menu
          mode="vertical"
          // selectedKeys={getCurrentSelectedKey()} // Desativado realce dinâmico
          className="drawer-menu"
          // Usar onClick no Menu ou em cada Item para fechar o drawer e rolar
        >
          {orderedMenuItems.map((item) => ( // Usar o array ordenado aqui também
            <Menu.Item key={item.key} className="drawer-menu-item">
              {/* Usar tags 'a' com onClick para scroll suave e fechar drawer */}
              <a href={item.path} onClick={(e) => {
                 e.preventDefault();
                 const id = item.path.substring(1);
                 scrollToSection(id);
                 closeDrawer(); // Fechar o drawer após o clique
              }}>
                {item.label}
              </a>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default HeaderLP;