import React from 'react';
import './css/styles.css';

function App() {

  const url = 'https://zoo-animal-api.herokuapp.com/animals/rand/10';
  const [peopleData, setPeopleData] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const fetchData = async() =>{
    const response = await fetch(url);
    const newData = await response.json();
    setPeopleData(newData);
    setLoading(false);
  }
  React.useEffect(()=>{
    fetchData();
  }, [])

  if (loading){
    return <section className='section loading'>
    <h1>Loading...</h1>
  </section>
  }
 console.log(peopleData)
  return (
    <div className="App">
      <h1>RANDOM ANIMAL SEARCH APP</h1>
      <input className='search-bar' placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
      {
  peopleData.filter(data => {
    if (query === '') {
      return data;
    } else if (data.name.toLowerCase().includes(query.toLowerCase())) {
      return data;
    }
  }).map((post) => (
    <div className="box" key={post.id}>
      <img className='container-image' src={post.image_link} alt={post.name}/>
      <p className='container-paragraph'><strong>Name : </strong>{post.name}</p>
      <p className='container-paragraph'><strong>Type : </strong>{post.animal_type}</p>
      <p className='container-paragraph'><strong>Can be found in : </strong> {post.geo_range}</p>
      <p className='container-paragraph'><strong>Diet : </strong> {post.diet}</p>
    </div>
  ))
}
      
    </div>
  );
}

export default App;
