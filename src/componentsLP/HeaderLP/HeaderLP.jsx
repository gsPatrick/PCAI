// src/componentsLP/HeaderLP/HeaderLP.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Menu, Image, Button, Drawer } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import './HeaderLP.css';

import logoImage from '../../assets/images/logoHeader.png'; // As 3 bolas brancas
import backgroundImage from '../../assets/images/backgroundAzul.png';

const { Header } = Layout;
const { Title, Text } = Typography;

const menuItems = [
  { key: 'quem-somos', label: 'Quem Somos', path: '/' }, // Ajuste path se necessário
  { key: 'solucoes', label: 'Soluções', path: '/solucoes' },
  { key: 'diferencial', label: 'Diferencial', path: '/diferencial' },
  { key: 'compromisso', label: 'Compromisso Ético', path: '/compromisso-etico' },
  { key: 'contato', label: 'Contato', path: '/contato' },
];

const HeaderLP = () => {
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation(); // Para saber a rota atual

  useEffect(() => {
    setVisible(true); // Para animação de entrada
  }, []);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Determina a chave do menu ativo baseado na rota atual
  const getCurrentSelectedKey = () => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => item.path === currentPath);
    return activeItem ? [activeItem.key] : [];
  };

  return (
    <>
      <Header
        className={`header-lp ${visible ? 'fade-in' : ''}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Row justify="space-between" align="middle" className="header-row">
          <Col className="logo-area">
            <Link to="/" className="logo-link">
              <Image
                src={logoImage}
                alt="People Change Logo"
                className="logo-img"
                preview={false}
              />
              <div className="company-name-container">
                <Title level={4} className="company-name-main">
                  PEOPLE CHANGE
                </Title>
                <Text className="company-name-ai">
                  <span className="ai-highlight">{'<AI>'}</span> CONSULTING
                </Text>
              </div>
            </Link>
          </Col>

          {/* Menu para Desktop */}
          <Col className="menu-desktop">
            <Menu
              mode="horizontal"
              selectedKeys={getCurrentSelectedKey()}
              className="header-menu"
            >
              {menuItems.map((item) => (
                <Menu.Item key={item.key} className="header-menu-item">
                  <Link to={item.path}>{item.label}</Link>
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
          <Link to="/" onClick={closeDrawer} className="drawer-logo-link">
            <Image src={logoImage} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
             <div className="company-name-container-drawer">
                <span className="company-name-main-drawer">PEOPLE CHANGE</span>
                <span className="company-name-ai-drawer">
                  <span className="ai-highlight-drawer">{'<AI>'}</span> CONSULTING
                </span>
              </div>
          </Link>
        }
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        className="menu-drawer"
        closable={true}
      >
        <Menu
          mode="vertical"
          selectedKeys={getCurrentSelectedKey()}
          className="drawer-menu"
          onClick={closeDrawer} // Fecha o drawer ao clicar em um item
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} className="drawer-menu-item">
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default HeaderLP;