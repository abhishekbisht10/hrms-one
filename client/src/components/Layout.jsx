import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout({ component: Component }) {
  return (
    <div className='min-h-screen flex bg-slate-100'>
      <Sidebar />

      <div className='flex flex-1 flex-col'>
        <Navbar />

        <main className='flex-1 p-6'>
          <div className='flex bg-white rounded-lg shadow-sm border border-slate-200 min-h-full p-6'>
            <Component />
          </div>
        </main>

      </div>
    </div>
  )
}

export default Layout