'use client'
import React from 'react';
import { Layout } from 'antd';
import MainExchangeRates from './MainExchangeRates';
import Clock from './Clock';
const { Content } = Layout;

const AppContent = () => {
    return (
        <Content className="content-main">
            <Clock />
            <MainExchangeRates />
        </Content>
    );
};

export default AppContent;