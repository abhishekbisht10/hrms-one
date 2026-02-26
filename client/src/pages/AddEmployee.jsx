import { useState } from "react";
import { Users } from "lucide-react";
import { toast } from "react-toastify";
import { addEmployee } from "../api";
import Loader from "../components/Loader";

function AddEmployee() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addEmployee(form);
      
      setForm({
        full_name: "",
        email: "",
        department: "",
      });

      toast.success("Employee added successfully!");

    } catch (err) {
      console.error(err);

      if(err.status === 409) {
        toast.warn(err.message)
      } else {
        toast.error(err.message)
      }
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return <Loader />
  }

  return (
    <div className="p-4 flex-1">
      <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
        <Users size={18} />
        Add Employee
      </h3>

      <form onSubmit={handleSubmit}>

        <label className="text-sm font-medium">
          Full Name*
        </label>
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm mt-2 mb-3 bg-slate-50"
          placeholder="John Doe"
        />

        <label className="text-sm font-medium">
          Email Address*
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm mt-2 mb-3 bg-slate-50"
          placeholder="john@example.com"
        />

        <label className="text-sm font-medium">
          Department*
        </label>
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm mt-2 mb-3 bg-slate-50"
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>

        <button
          type="submit"
          className="btn-primary w-full mt-2"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;