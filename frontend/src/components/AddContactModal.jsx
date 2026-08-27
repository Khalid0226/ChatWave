import React, { useState } from 'react';
import axios from 'axios';
import { X, UserPlus, Phone, Loader2 } from 'lucide-react';
import API from '../services/Axios';

function AddContactModal({ isOpen, onClose, onContactAdded, isDarkMode }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
        const response = await API.post('/chat/add-contact',{phone})
        if (response.status === 200) {
            alert(response.data.message)
        }
        setError('')

        if(onContactAdded){
            onContactAdded(response.data.contact)
        }

        setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
        setError(error.response?.data?.message)
    } finally{
        setLoading(false)
    }
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md border rounded-2xl p-6 shadow-2xl transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold tracking-tight">Add New Chat Contact</h3>
          </div>
          <button 
            onClick={onClose}
            className={`p-1.5 rounded-xl transition cursor-pointer ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Enter Phone Number
            </label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="e.g. 7894561230"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border transition ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                }`}
                required
              />
            </div>
          </div>

          {/* Feedback Messages */}
          {error && <p className="text-rose-500 text-[11px] font-medium">{error}</p>}
          {/* {success && <p className="text-emerald-500 text-[11px] font-medium">{success}</p>} */}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
                isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Add Contact
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddContactModal;