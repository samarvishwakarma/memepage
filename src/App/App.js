import { Meme } from '../Meme/Meme'
// import styles from './styles.module.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Meme />} />
      <Route path='/generated' element={<MemeGenerated />}>
      </Route>
    </Routes> 
  );
}
