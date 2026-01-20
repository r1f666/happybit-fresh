'use client';

import React, { useState, useEffect } from 'react';

const ApiData = () => {
    const [coins, setCoins] = useState([]);
    const [showCount, setShowCount] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchCoinsFromApi = await import('../api/coins/route').then(module => module.fetchCoinsFromApi);
                const data = await fetchCoinsFromApi();
                setCoins(data.result || []);
            } catch (error) {
                console.error('Error loading crypto data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="crypto-loading">
                Загрузка криптовалют...
            </div>
        );
    }

    return (
        <div className="crypto-container">
            <div className="crypto-title">
                ₿ Криптовалюты
            </div>
            
            {/* Кнопки для управления количеством */}
            <div className="crypto-controls">
                <button 
                    onClick={() => setShowCount(3)} 
                    className={`crypto-btn ${showCount === 3 ? 'active' : ''}`}
                >
                    3
                </button>
                <button 
                    onClick={() => setShowCount(5)} 
                    className={`crypto-btn ${showCount === 5 ? 'active' : ''}`}
                >
                    5
                </button>
                <button 
                    onClick={() => setShowCount(10)} 
                    className={`crypto-btn ${showCount === 10 ? 'active' : ''}`}
                >
                    10
                </button>
            </div>
            
            <div>
                {coins.length > 0 ? (
                    <>
                        {coins.slice(0, showCount).map(coin => (
                            <div key={coin.id} className="crypto-coin">
                                <div className="crypto-coin-header">
                                    <div>
                                        <div className="crypto-coin-name">{coin.name}</div>
                                        <div className="crypto-coin-symbol">{coin.symbol}</div>
                                    </div>
                                    <div className="crypto-coin-price">
                                        ${coin.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="crypto-footer">
                            Показано: {Math.min(showCount, coins.length)} из {coins.length}
                        </div>
                    </>
                ) : (
                    <div className="crypto-loading">Нет данных</div>
                )}
            </div>
        </div>
    );
};

export default ApiData;