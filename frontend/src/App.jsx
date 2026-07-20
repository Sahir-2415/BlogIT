import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import Drafts from "./pages/Drafts";
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/" element={<Home></Home>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/dashboard" element={<DashboardLayout />}>

  <Route
    index
    element={<Dashboard />}
  />

  <Route
    path="create"
    element={<CreatePost />}
  />

  <Route
    path="posts"
    element={<MyPosts />}
  />

  <Route
    path="drafts"
    element={<Drafts />}
  />
  <Route
    path="profile"
    element={<Profile />}
/>

<Route
    path="profile/edit"
    element={<EditProfile />}
/>

</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
