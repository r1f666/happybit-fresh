'use client'
import React from 'react';
import { Layout } from 'antd';
const { Header} = Layout;

const AppHeader = () => {
    return (
            <Header className="header-main">
                <h1>HAPPYBIT</h1>
            <div>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/login">Login</a>
            </div>
            </Header>
    );
};

export default AppHeader;