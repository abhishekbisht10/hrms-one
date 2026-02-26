import { User2 } from "lucide-react";

function Navbar() {
  return (
    <div className='h-14 bg-white flex items-center justify-end px-6 border-b border-slate-200'>
      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition">
        <User2 className="h-5 w-5 text-slate-600" />
        <p className="text-sm text-slate-600">
          Admin
        </p>
      </div>
    </div>
  )
}

export default Navbar