'use client';

import React, { useState, useEffect } from 'react';

const ExchangeRates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  // Загружаем курсы при монтировании
  useEffect(() => {
    fetchRates();
  }, []);

  // Функция загрузки курсов
  const fetchRates = async (customDate = '', currency = '') => {
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (customDate) params.append('date', customDate);
      if (currency) params.append('currency', currency);
      
      const response = await fetch(`/api/nbrb?${params.toString()}`);
      const result = await response.json();
      
      if (result.success) {
        // Если запрашивали конкретную валюту, оборачиваем в массив
        const data = Array.isArray(result.data) ? result.data : [result.data];
        setRates(data);
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  // Основные валюты для быстрого выбора
  const popularCurrencies = [
    { code: 'USD', name: 'Доллар США' },
    { code: 'EUR', name: 'Евро' },
    { code: 'RUB', name: 'Российский рубль' },
    { code: 'PLN', name: 'Польский злотый' },
    { code: 'UAH', name: 'Украинская гривна' },
    { code: 'CNY', name: 'Китайский юань' }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Курсы валют НБРБ</h2>
      
      {/* Панель управления */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {/* Выбор даты */}
        <div>
          <label style={{ marginRight: '10px' }}>Дата:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: '5px' }}
          />
          <button
            onClick={() => fetchRates(date, selectedCurrency)}
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            Применить
          </button>
        </div>
        
        {/* Выбор валюты */}
        <div>
          <label style={{ marginRight: '10px' }}>Валюта:</label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            style={{ padding: '5px' }}
          >
            <option value="">Все валюты</option>
            {popularCurrencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>
        
        {/* Кнопка сброса */}
        <button
          onClick={() => {
            setDate('');
            setSelectedCurrency('');
            fetchRates();
          }}
          style={{ padding: '5px 10px' }}
        >
          Сегодня / Все валюты
        </button>
      </div>
      
      {/* Быстрый выбор популярных валют */}
      <div style={{ marginBottom: '20px' }}>
        <p>Быстрый выбор:</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {popularCurrencies.map(currency => (
            <button
              key={currency.code}
              onClick={() => {
                setSelectedCurrency(currency.code);
                fetchRates(date, currency.code);
              }}
              style={{
                padding: '5px 10px',
                backgroundColor: selectedCurrency === currency.code ? '#007bff' : '#f0f0f0',
                color: selectedCurrency === currency.code ? 'white' : 'black',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {currency.code}
            </button>
          ))}
        </div>
      </div>
      
      {/* Отображение курсов */}
      {loading ? (
        <div>Загрузка курсов...</div>
      ) : rates.length === 0 ? (
        <div>Нет данных</div>
      ) : (
        <div>
          <div style={{ marginBottom: '10px', color: '#666' }}>
            Дата актуальности: {rates[0].Date ? formatDate(rates[0].Date) : 'Сегодня'}
          </div>
          
          <div style={{ display: 'grid', gap: '10px' }}>
            {rates.map(rate => (
              <div
                key={rate.Cur_ID}
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0' }}>
                      {rate.Cur_Name} ({rate.Cur_Abbreviation})
                    </h3>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      Код: {rate.Cur_Code} • ID: {rate.Cur_ID}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {rate.Cur_OfficialRate?.toFixed(4) || 'Н/Д'} BYN
                    </div>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      {rate.Cur_Scale} {rate.Cur_Abbreviation}
                    </div>
                  </div>
                </div>
                
                {/* Дополнительная информация */}
                <div style={{ 
                  marginTop: '10px', 
                  paddingTop: '10px', 
                  borderTop: '1px solid #eee',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  <div>Номинал: {rate.Cur_Scale} единиц</div>
                  {rate.Date && <div>Дата: {formatDate(rate.Date)}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeRates;