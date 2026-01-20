export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Minsk';
    const days = searchParams.get('days') || 5;
  
    try {
      // Координаты Минска
      const cities = {
        'Minsk': { lat: 53.9, lon: 27.5667 },
        'Gomel': { lat: 52.4345, lon: 30.9754 },
        'Brest': { lat: 52.0975, lon: 23.6877 },
        'Grodno': { lat: 53.6884, lon: 23.8258 },
        'Vitebsk': { lat: 55.1904, lon: 30.2049 }
      };
  
      const location = cities[city] || cities['Minsk'];
  
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,windspeed_10m_max&timezone=auto&forecast_days=${days}`
      );
  
      if (!response.ok) {
        throw new Error('Weather API error');
      }
  
      const data = await response.json();
  
      return Response.json({
        success: true,
        city: city,
        data: data.daily,
        location: location
      });
  
    } catch (error) {
      return Response.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }
  }