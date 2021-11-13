import React, { Suspense } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const Product = React.lazy(() => import('./components/Product'));
const Course = React.lazy(() => import('./components/Course'));
function App() {
  return (
    <Router>
      <NavigationBar />
      <Suspense fallback={<img src="https://www.uttf.com.ua/assets/images/loader2.gif" height="100%" width="100%" />}>
        <Routes>
          <Route path='/' element={<Product />} />
          <Route path='/course' element={<Course />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
