import axios from 'axios';
import { useEffect, useState } from 'react';
import ExplorePlant from './ExplorePlant';

const API = process.env.REACT_APP_API_URL;

export default function ExploreIndex() {
  const [explore, setExplore] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(`${API}/plants/explore`)
      .then((res) => {
        setExplore(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTextChange = (event) => {
    setSearch(event.target.value);
  };

  const currentDisplay = (explore, search) => {
    const results = explore
      .filter(
        (plant) =>
          plant.common[0] &&
          plant.common[0].toLowerCase().startsWith(search.toLowerCase())
      )
      .map((plant, idx) => {
        return (
          <ExplorePlant
            key={idx}
            id={plant.id}
            name={plant.common[0]}
            latin={plant.latin}
            category={plant.category}
          />
        );
      });
    return results;
  };

  return (
    <div className="flex flex-col gap-2 tablet:p-8">
      <input
        className="flex flex-center sticky top-5 items-center justify-center border-2 outline-green-200 rounded-full p-1 pl-4 shadow-xl tablet:mb-2 tablet:mx-16 laptop:top-32 laptop:mx-24"
        type="text"
        placeholder="Search plant by name"
        onChange={handleTextChange}
      />
      <div className="p-1 laptop:grid-view">{currentDisplay(explore, search)}</div>
    </div>
  );
}
