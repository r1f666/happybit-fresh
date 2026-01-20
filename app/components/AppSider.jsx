'use client'
import React from 'react';
import { Layout, Flex } from 'antd';
import ApiData from './ApiData'
import WeatherForecast from './WeatherForecast'
const { Sider} = Layout;

const AppSider = () => {
    return (
          <Sider width="25%" className="sider-main">
              <Flex vertical>
                  <WeatherForecast />
        
              </Flex>
        </Sider>
    );
};

export default AppSider;