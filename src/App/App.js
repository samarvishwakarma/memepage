import { Meme } from '../Meme/Meme'
// import styles from './styles.module.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';
import { useState } from 'react';

export const App = () => {
  const [dark,setDark] = useState(true);
  return (
    <Routes>
      <Route path="/" element={<Meme dark={dark} setDark={setDark} />} />
      <Route path='/generated' element={<MemeGenerated dark={dark} />}>
      </Route>
    </Routes> 
  );
}
