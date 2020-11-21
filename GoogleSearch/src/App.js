import { useState, useEffect } from 'react';
import {
  Header,
  TabsList,
  Performance,
  LinksList,
} from './components/organisms';

const App = () => {
  const [links, setLinks] = useState([]);
  const [fetchStart, setFetchStart] = useState(0);
  const [fetchEnd, setFetchEnd] = useState(0);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFetchStart(Date.now());
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`)
      .then((data) => data.json())
      .then((data) => {
        setLinks(data.drinks);
        setFetchEnd(Date.now());
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredLinks = links.filter(
    (link) =>
      link.strDrink.toLowerCase().includes(searchText.toLowerCase()) ||
      link.strMeasure1.toLowerCase().includes(searchText.toLowerCase()) ||
      link.strGlass.toLowerCase().includes(searchText.toLowerCase()) ||
      link.strAlcoholic.toLowerCase().includes(searchText.toLowerCase()) ||
      link.strInstructions.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Header onSearch={setSearchText} />
      <TabsList />
      <Performance results={links.length} speed={fetchEnd - fetchStart} />
      <LinksList links={filteredLinks} />
    </div>
  );
};

export default App;
