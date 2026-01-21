
import Clock  from "./components/Clock";
import WeatherForecast from "./components/WeatherForecast";
import MainExchangeRates from "./components/MainExchangeRates";
import ChangeBackground from "./components/ChangeBackground";

export default function Home() {
  return (
      <div className="main_cont">
          <h1>🚀HAPPYBIT</h1>
          <Clock/>
          <WeatherForecast/>
          <MainExchangeRates /><ChangeBackground />
      </div>
  );
}
