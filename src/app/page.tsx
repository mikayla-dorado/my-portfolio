import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";


//these 'types' specify th structure of the data fetched from the APIs
type Weather = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    wind_speed_10m: string;
    relative_humidity_2m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
}

type CatFact = {
  data: string;
};

//this will convert temp to F
const convertCelsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export default async function HomePage() {
  //these are the async functions that fetch data from the specified APIs
  const getWeatherData = await getWeather();
  const getCatFactsData = await getCatFacts();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto max-w-[600px]">
          <div className="grid grid-cols-2 gap-8 p-4">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-4xl mb-8">
                It&apos;s Tuesday, {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}
              </h1>
              <Card label="Houston, TX">
                <div>
                  {/* <p className="text-5xl my-3">{getWeatherData.current.temperature_2m}°F</p>
                  <p>Wind speed {getWeatherData.current.wind_speed_10m} km/h</p>
                  <p className="mt-1">Humidity {getWeatherData.current.relative_humidity_2m}%</p> */}
                   <p className="text-5xl my-3">{getWeatherData.current && convertCelsiusToFahrenheit(getWeatherData.current.temperature_2m)}°F</p>
                  <p>Wind speed {getWeatherData.current?.wind_speed_10m} km/h</p>
                  <p className="mt-1">Humidity {getWeatherData.current?.relative_humidity_2m}%</p>
                 </div>
              </Card>
            </div>
            <div className="flex flex-col gap-8">
              <Card label="About Me">
                <div>
                  My name is Mikayla, I love programming, cooking/baking, reading, and playing video games with my husband!
                </div>
              </Card>
              <Card label="Cat Fact">
              <div style={{ height: "105px", overflowY: "auto" }}>{getCatFactsData?.data || "Loading cat fact..."}</div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

async function getWeather(): Promise<Weather> {
  const data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=29.760427&longitude=-95.369804&current=temperature_2m,wind_speed_10m,relative_humidity_2m')
  return data.json() as Promise<Weather>;
}

async function getCatFacts(): Promise<CatFact> {
  const timestamp = new Date().getTime();
  const data = await fetch(`https://meowfacts.herokuapp.com/?timestamp=${timestamp}`)
  return data.json() as Promise<CatFact>;
}