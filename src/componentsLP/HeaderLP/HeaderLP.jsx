// src/componentsLP/HeaderLP/HeaderLP.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Row, Col, Typography, Menu, Image, Button, Drawer } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import './HeaderLP.css';

import logoLaranjaImage from '../../assets/images/logocompletolaranja.png';
import backgroundCinzaImage from '../../assets/images/backgroundCinza.png';

const { Header } = Layout;
const { Title, Text } = Typography;

const menuItems = [
  { key: 'quem-somos', label: 'Quem Somos', path: '#video' },
  { key: 'solucoes', label: 'As Soluções', path: '#solutions' },
  { key: 'diferencial', label: 'O Nosso Diferencial', path: '#diferencial' },
  { key: 'compromisso', label: 'Compromisso Ético', path: '#ethical-commitment' },
  { key: 'contato', label: 'Contactos', path: '#contact' },
  { key: 'beneficios', label: 'Benefícios Esperados', path: '#benefits' },
];

// Reordenar o array para a ordem desejada
const orderedMenuItems = [
    menuItems.find(item => item.key === 'quem-somos'),
    menuItems.find(item => item.key === 'diferencial'), // CORRIGIDO: Usar a chave correta 'diferencial'
    menuItems.find(item => item.key === 'solucoes'),
    menuItems.find(item => item.key === 'beneficios'),
    menuItems.find(item => item.key === 'compromisso'),
    menuItems.find(item => item.key === 'contato'),
].filter(item => !!item); // Garante que apenas itens encontrados (não undefined) sejam incluídos


const HeaderLP = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const currentHeaderRef = headerRef.current;
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if (currentHeaderRef) { // Verificar se currentHeaderRef ainda existe
                  currentHeaderRef.classList.add('header-lp-visible');
                }
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );

        if (currentHeaderRef) {
          observer.observe(currentHeaderRef);
        }

        return () => {
          if (currentHeaderRef) {
            observer.unobserve(currentHeaderRef);
          }
        };
    }, []);


  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        // Não fechar o drawer aqui, pois será fechado no onClick do item do menu
    };

  // Função não utilizada no momento para seleção dinâmica, pode ser removida ou implementada depois
  // const getCurrentSelectedKey = () => {
  //     if (window.location.pathname === '/' && window.location.hash === '') {
  //         return orderedMenuItems.length > 0 ? [orderedMenuItems[0].key] : [];
  //     }
  //     return [];
  // };


  return (
    <>
      <Header
        ref={headerRef}
        className="header-lp"
        style={{ backgroundImage: `url(${backgroundCinzaImage})` }}
      >
        <div className="header-background-overlay"></div>

        <Row justify="space-between" align="middle" className="header-row">
          <Col className="logo-area">
            <a id="hero-section-link" href="#hero-section" className="logo-link" onClick={(e) => { // Adicionado ID ao link para clareza, se necessário
                 e.preventDefault();
                 scrollToSection('hero-section');
             }}>
               <Image
                 src={logoLaranjaImage}
                 alt="People Change Logo Laranja"
                 className="logo-img-orange"
                 preview={false}
               />
             </a>
          </Col>

          <Col className="menu-desktop">
            <Menu
              mode="horizontal"
              className="header-menu"
            >
              {orderedMenuItems.map((item) => (
                <Menu.Item key={item.key} className="header-menu-item">
                   <a href={item.path} onClick={(e) => {
                       e.preventDefault();
                       const id = item.path.substring(1);
                       scrollToSection(id);
                   }}>
                       {item.label}
                   </a>
                </Menu.Item>
              ))}
            </Menu>
          </Col>

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

      <Drawer
        title={
           <a href="#hero-section" onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero-section'); // scroll suave
              closeDrawer(); // fechar drawer
          }} className="drawer-logo-link">
            <Image src={logoLaranjaImage} alt="People Change Logo Laranja" className="drawer-logo-img" preview={false} />
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
          className="drawer-menu"
        >
          {orderedMenuItems.map((item) => (
            <Menu.Item key={item.key} className="drawer-menu-item">
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