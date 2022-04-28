import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import Spinner from './components/loader';
import ListCountries from './components/listCountries';

function App() {
  const [data, setData] = useState();
  const [filterArray, setFilterArray] = useState();
  const [loding, setLoding] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState();

  const urlCountries = 'https://restcountries.com/v2/all?fields=name,region,area';

  useEffect(() => {
    fetch(urlCountries).then(
      response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }
    ).then(data => {
      setData(data);
      setFilterArray(data);
    }

    ).catch(error => {
      console.error('Error fetching data : ', error)
      setError(error);
    }).finally(() => {
      setLoding(false);
    })
  }, []);

  useEffect(() => {
    const sortArray = type => {
      let sorted;
      switch (type) {
        case 'ascending':
          sorted = filterArray.sort((a, b) => {
            return b.name.localeCompare(a.name);
          })
          setFilterArray(sorted);
          break;

        case 'descending':
          sorted = filterArray.sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
          setFilterArray(sorted);
          break;

        default:
          break;
      }
    };

    sortArray(sortType);
  }, [sortType]);

  const countriesOceania = () => {
    const filtered = data.filter(el => el.region === 'Oceania')
    setFilterArray(filtered);
  }

  const areaLessLithuania = () => {
    const Lithuania = data.find(el => el.name === 'Lithuania');
    const filtered = data.filter(el => el.area <= Lithuania.area);
    setFilterArray(filtered);
  }
  if (loding) return <Spinner />;
  if (error) return "Error!";
  return (
    <div className="App">
      < Header />
      <div className="filters">
        <div className="button-box">
          <button
            onClick={() => countriesOceania()}
          >
            Countries “Oceania” region
          </button>
          <button
            onClick={() => areaLessLithuania()}
          >
            Lithuania bigger than countries
          </button>
        </div>
        <div className="select-box">
          <select
            value={sortType}
            defaultValue={"default"}
            onChange={(e) => setSortType(e.target.value)}>
            <option value={"default"} disabled>
              Choose an option
            </option>
            <option value="ascending" >ascending</option>
            <option value="descending" defaultValue>descending</option>
          </select>
        </div>
      </div>
      < ListCountries content={filterArray} />
    </div>
  );
}

export default App;
