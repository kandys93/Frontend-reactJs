import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {useContext} from 'react';
import ServiceContext from './common/ServiceContext';



function App() {
  const context = useContext(ServiceContext);
  console.log(context);
  const [searchText, setSearchText] = useState('');
  const [entries, setEntries] = useState([]);

  const transferToEntries = (data) => {
    let nouveauTableau = data.map(x => Object.values(x).join(' - '));
    setEntries(nouveauTableau);
  }
  
  const handleList = () => {
    context.apiService.getDataFromList((data) => {
      transferToEntries(data);
    });
    
  }
  const handleSearch = () => {
    context.apiService.getDataFromSearch(searchText, (data) => {
      transferToEntries(data);
    });
  }

  return (
    <div className="App">
      <h1>Annuaire</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Chercher</button>
      <button onClick={handleList}>Tout</button>
      <div>{entries.map(e=><div>{e}</div>)}</div>
    </div>
  );
}
export default App;




