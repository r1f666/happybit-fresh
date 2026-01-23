
import Clock  from "./components/Clock";
import WeatherForecast from "./components/WeatherForecast";
import MainExchangeRates from "./components/MainExchangeRates";
import ChangeBackground from "./components/ChangeBackground";
import WindyIframe from "./components/WindyIframe";

export default function Home() {
  return (
      <div className="main_cont">
          <h1>🚀HAPPYBIT</h1>
          <div className="container">
              <div className="item"><ChangeBackground/></div>
              <div className="item">
                  <Clock/>
                  <MainExchangeRates/>
              </div>
              <div className="item">
                  <div className="content_block">
                  <WeatherForecast/>
                  <WindyIframe/>
                  </div>
              </div>
              <div className="item">Footer</div>


          </div>


      </div>
  );
}
