export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date'); // optional
    const currency = searchParams.get('currency'); // optional: USD, EUR, RUB, etc
    
    try {
      let apiUrl;
      
      if (currency) {
        // Получение курса конкретной валюты
        apiUrl = `https://api.nbrb.by/exrates/rates/${currency}?parammode=2`;
      } else {
        // Получение всех курсов на сегодня
        apiUrl = 'https://api.nbrb.by/exrates/rates?periodicity=0';
      }
      
      // Добавляем дату если указана
      if (date && !currency) {
        apiUrl += `&ondate=${date}`;
      } else if (date && currency) {
        apiUrl += `&ondate=${date}`;
      }
      
      const response = await fetch(apiUrl, {
        next: { revalidate: 3600 } // Кэшируем на 1 час
      });
      
      if (!response.ok) {
        throw new Error(`NBRB API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return Response.json({
        success: true,
        data: data,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('NBRB API Error:', error);
      return Response.json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  }