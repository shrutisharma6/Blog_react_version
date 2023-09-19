
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import './App.css';
import Articles from './components/articles/Articles';
import Users from './components/users/Users';
import Navigation from './components/layouts/Navigation';
import Home from './components/layouts/Home';
import Categories from './components/categories/Categories';
import Login from './components/authentication/Login';
import CreateArticle from './components/articles/CreateArticle';
import SignUp from './components/authentication/SignUp';
import ShowArticle from './components/articles/ShowArticle';
import ShowUser from './components/users/ShowUser';
import EditArticle from './components/articles/EditArticle';
import ShowCategory from './components/categories/ShowCategory';
import Footer from './components/layouts/Footer';
import EditUser from './components/users/EditUser';
import CreateCategories from './components/categories/CreateCategories';
import Friends from './components/users/Friends';
import PendingRequest from './components/users/PendingRequest';

function App() {
  return (
    
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Articles" Component={Articles} />
        <Route path="/Users" Component={Users} />
        <Route path="/Categories" Component={Categories} />
        <Route path="/Login" Component={Login} />
        <Route path="/SignUp" Component={SignUp} />
        <Route path="/CreateArticle" Component={CreateArticle} />
        <Route path="/ShowArticle/:articleId" Component={ShowArticle} />
        <Route path="/ShowUser/:userId" Component={ShowUser} />
        <Route path="/EditArticle/:articleId" Component={EditArticle} />
        <Route path="/ShowCategory/:categoryId" Component={ShowCategory} />
        <Route path="/CreateCategories" Component={CreateCategories} />
        <Route path="/EditUser/:userId" Component={EditUser} />

        <Route path="/ShowUser/:userId/Friends" Component={Friends} />
        <Route path="/ShowUser/:userId/PendingRequest" Component={PendingRequest} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
