import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from './components/Main';
import Day from './components/Day';
import { week } from './components/utils';

const today = new Date().getDay();
const nextFiveDays = week.slice(today)
  .concat(week.slice(0, today))
  .slice(0, 5);

const city = '3871336';
const url = `https://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${process.env.REACT_APP_APIKEY}&units=metric&lang=es`;
  
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
    fetch(url)
      .then((response) => response.json())
      .then(({ list }) => {
        const newData = nextFiveDays.map((i) => list.filter((d) => new Date(d.dt_txt).getDay() === i.num))
        setData(newData);
        setLoading(false);
      })
      .catch((e) => console.error(e));
    }
  }, [data, loading]);
  return (
    <div>
      <Router>
        <Switch>
          {nextFiveDays.map((d, index) => (
            <Route path={`/${d.name}`} key={d.num}>
              <Day data={data[index]} />
            </Route>
          ))}
          <Route path="/" exact>
            <Main data={data} days={nextFiveDays} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
