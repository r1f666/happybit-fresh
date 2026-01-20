
import Clock  from "./components/Clock";
import WeatherForecast from "./components/WeatherForecast";

export default function Home() {
  return (
      <div style={{padding: 50, textAlign: 'center', fontFamily: 'Arial'}}>
          <h1>🚀 HAPPYBIT РАБОТАЕТ!</h1>
          <p>Проект успешно задеплоен на Vercel</p>
          <p>Время: {new Date().toLocaleString()}</p>
          <div style={{marginTop: 30, padding: 20, background: '#f0f0f0'}}>
              <Clock/>

          </div>
                 <WeatherForecast/>

      </div>
  );
}
