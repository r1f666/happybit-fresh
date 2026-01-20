'use client';

import React, { useState, useEffect } from 'react';
import '@/app/components/style.css';

const WeatherForecast = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWeather();
    }, []);

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/weather?city=Minsk&days=5`);
            const result = await response.json();

            if (result.success) {
                setWeather(result);
            }
        } catch (error) {
            console.error('Weather fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (code, isDay = true) => {
        if (code === 0) return isDay ? '☀️' : '🌙';
        if (code >= 1 && code <= 3) return isDay ? '⛅' : '☁️';
        if (code >= 45 && code <= 48) return '🌫️';
        if (code >= 51 && code <= 67) return '🌧️';
        if (code >= 71 && code <= 77) return '❄️';
        if (code >= 80 && code <= 82) return '🌧️';
        if (code >= 95 && code <= 99) return '⛈️';
        return isDay ? '☁️' : '🌃';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return `${days[date.getDay()]} ${date.getDate()}`;
    };

    if (loading) {
        return (
            <div className="weather-loading">
                Загрузка погоды...
            </div>
        );
    }

    return (
        <div className="weather-container">
            <div className="weather-title">
                🌤️ Погода в Минске
            </div>

            {weather && weather.data && (
                <>
                    {weather.data.time.map((date, index) => (
                        <div key={date} className="weather-day-card">
                            <div className="weather-day-header">
                                {formatDate(date)}
                            </div>

                            <div className="weather-day-night">
                                {/* День */}
                                <div className="weather-period">
                                    <div className="weather-period-label">День</div>
                                    <div className="weather-icon">
                                        {getWeatherIcon(weather.data.weathercode[index], true)}
                                    </div>
                                    <div className="weather-temp">
                                        {weather.data.temperature_2m_max[index]}°
                                    </div>
                                </div>

                                <div className="weather-divider"></div>

                                {/* Ночь */}
                                <div className="weather-period">
                                    <div className="weather-period-label">Ночь</div>
                                    <div className="weather-icon">
                                        {getWeatherIcon(weather.data.weathercode[index], false)}
                                    </div>
                                    <div className="weather-temp">
                                        {weather.data.temperature_2m_min[index]}°
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="weather-footer">
                        <div>Минск, Беларусь</div>
                        <button onClick={fetchWeather} className="weather-update-btn">
                            Обновить
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherForecast;