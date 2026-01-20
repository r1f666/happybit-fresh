
import Clock  from "./components/Clock";
import WeatherForecast from "./components/WeatherForecast";
import MainExchangeRates from "./components/MainExchangeRates";

export default function Home() {
  return (
      <div className="main_cont">
          <h1>🚀 HAPPYBIT РАБОТАЕТ!</h1>
          <p>Проект успешно задеплоен на Vercel</p>
          <p>Время: {new Date().toLocaleString()}</p>
          <div style={{marginTop: 30, padding: 20, background: '#f0f0f0'}}>
              <Clock/>

          </div>
          <WeatherForecast/>
          <MainExchangeRates />
      </div>
  );
}
