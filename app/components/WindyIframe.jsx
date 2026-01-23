// components/WindyIframe.jsx
'use client';

import { useState } from 'react';

const WindyIframe = ({
                         lat =  53.9045,
                         lon = 27.5615,
                         zoom = 5,
                         height = 650
                     }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Генерация URL для Windy с параметрами
    const windyUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=${zoom}&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=true&metricWind=default&metricTemp=default&radarRange=-1`;

    return (
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Загрузка карты погоды...</p>
                    </div>
                </div>
            )}

            <iframe
                src={windyUrl}
                width="100%"
                height={height}
                className="border-0"
                title="Интерактивная карта погоды Windy"
                onLoad={() => setIsLoaded(true)}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
            />


        </div>
    );
};

export default WindyIframe;