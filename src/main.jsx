import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddmissionForm from './AddmissionForm.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/addmission",
    element:<AddmissionForm/>
  }
]) 
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
