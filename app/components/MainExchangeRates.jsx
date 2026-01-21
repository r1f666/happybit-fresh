'use client';

import React, { useState, useEffect } from 'react';

const MainExchangeRates = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const mainCurrencies = [
        { code: 'USD', name: 'Доллар США', scale: 1, flag: '🇺🇸' },
        { code: 'EUR', name: 'Евро', scale: 1, flag: '🇪🇺' },
        { code: 'RUB', name: 'Российский рубль', scale: 100, flag: '🇷🇺' }
    ];

    useEffect(() => {
        fetchRates();
    }, []);

    const fetchRates = async (selectedDate = '') => {
        setLoading(true);

        try {
            const results = {};

            await Promise.all(
                mainCurrencies.map(async (currency) => {
                    try {
                        const response = await fetch(
                            `/api/nbrb?currency=${currency.code}${selectedDate ? `&date=${selectedDate}` : ''}`
                        );
                        const result = await response.json();

                        if (result.success && result.data) {
                            results[currency.code] = result.data;
                        }
                    } catch (error) {
                        console.error(`Error fetching ${currency.code}:`, error);
                    }
                })
            );

            setRates(results);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num) => {
        if (!num) return '—';
        return num.toFixed(4);
    };

    return (
        <div className="exchange-rates-container">
            <h2 className="exchange-rates-title">
                💱 Курсы валют НБРБ
            </h2>

            <div className="date-selector">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                        fetchRates(e.target.value);
                    }}
                    className="date-input"
                />
                <button
                    onClick={() => {
                        const today = new Date().toISOString().split('T')[0];
                        setDate(today);
                        fetchRates();
                    }}
                    className="today-button"
                >
                    Сегодня
                </button>
            </div>

            {loading ? (
                <div className="loading-message">Загрузка курсов...</div>
            ) : (
                <div className="rates-table">
                    <div className="rates-table-header">
                        <div className="rates-table-header-cell">Валюта</div>
                        <div className="rates-table-header-cell right">Номинал</div>
                        <div className="rates-table-header-cell right">Курс, BYN</div>
                    </div>

                    {mainCurrencies.map(currency => {
                        const rate = rates[currency.code];

                        return (
                            <div
                                key={currency.code}
                                className={`rates-table-row ${rate ? 'available' : 'unavailable'}`}
                            >
                                <div className="currency-info">
                                    <span className="currency-flag">
                                        {currency.flag}
                                    </span>
                                    <div>
                                        <div className="currency-name">
                                            {currency.name} ({currency.code})
                                        </div>
                                        {rate && (
                                            <div className="currency-date">
                                                Обновлено: {new Date(rate.Date).toLocaleDateString('ru-RU')}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="currency-scale">
                                    {currency.scale}
                                </div>

                                <div className="currency-rate-container">
                                    <div className="currency-rate">
                                        {rate ? formatNumber(rate.Cur_OfficialRate) : '—'}
                                    </div>
                                    <div className="currency-rate-label">
                                        {rate ? `за ${currency.scale} ${currency.code}` : 'нет данных'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="rates-table-footer">
                        Курсы Национального банка Республики Беларусь
                        <div className="rates-table-footer-time">
                            {Object.keys(rates).length > 0 &&
                                `Обновлено: ${new Date().toLocaleTimeString('ru-RU')}`
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainExchangeRates;