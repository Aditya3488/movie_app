import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import './App.css';
import Banner from './Components/Banner';
import Favourites from './Components/Favourites';
import MovieList from './Components/MovieList';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact render={(props)=>(
          <>
            <Banner {...props} />
            <MovieList {...props} />
          </>
        )} />
        <Route path='/favourites' component={Favourites} />
      </Switch>
      {/* <Banner/>
      <MovieList/> */}
      {/* <Favourites /> */}
    </Router>
  );
}

export default App;
