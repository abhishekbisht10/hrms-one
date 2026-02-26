import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Logo from '../assets/hrms-logo-light.png'

function Sidebar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  const routes = [
    {
      title: 'Dashboard',
      path: '/'
    },
    {
      title: 'Employees',
      children: [
        { title: 'Employee List', path: '/employees' },
        { title: 'Add Employee', path: '/employees/add' },
      ]
    },
    {
      title: 'Attendance',
      children: [
        { title: 'View Attendance', path: '/attendance' },
        { title: 'Manage Attendance', path: '/attendance/manage' }
      ]
    }
  ]

  useEffect(() => {
    // Track active page
    setCurrentPath(location.pathname)
  }, [location])

  return (
    <div className='w-70 bg-[#06020c]'>
      <div className='flex flex-col items-center gap-8 p-10'>
        <img 
          src={Logo} 
          alt="HRMS Logo" 
          className='h-24 w-44' 
        />

        <div className='w-full flex flex-col gap-2'>
        {
          routes.map((route) => (
            <div key={route.title} className="flex flex-col gap-4">

              {route.children ? (
                <p className="text-xs text-slate-400 uppercase mt-3">
                  {route.title}
                </p>
              ) : (
                <a
                  href={route.path}
                  className={`text-sm text-white flex gap-2 ${
                    currentPath === route.path ? "!text-blue-300" : ""
                  }`}
                >
                  {route.title}
                </a>
              )}

              {route.children?.map((sub) => (
                <a
                  key={sub.title}
                  href={sub.path}
                  className={`
                    text-sm text-white pl-3 transition-all duration-200 border-s border-[#06020c] hover:border-white ${
                    currentPath === sub.path ? "!text-blue-300" : ""
                  }`}
                >
                  {sub.title}
                </a>
              ))}

            </div>
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default Sidebar