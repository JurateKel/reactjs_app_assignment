import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Toolbar from './components/Toolbar';
import UserLogin from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import Profile from './pages/Profile';
import AllUsers from './pages/AllUsers';
import Conversations from './pages/Conversations';
import SelectedUser from './pages/SelectedUser';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Toolbar/>
        <Routes>
          <Route path='/' element={<UserLogin/>}/>
          <Route path='/register' element={<UserRegistration/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/all_users' element={<AllUsers/>}/>
          <Route path='/conversations' element={<Conversations/>}/>
          <Route path='/user/:userName' element={<SelectedUser/>}/>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
