'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);

    try {
      const res = await fetch('https://backbmgroup.smartdiller.com/api/main/storelead', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok && data.status) {
        setSuccess(true);
        setName('');
        setPhone('');
      } else {
        setError(data.message || 'Xatolik yuz berdi');
      }
    } catch (err) {
      setError('Tarmoq xatoligi yoki server javob bermadi');
    }

    setLoading(false);
  };

  return (
    <div className="w-full bg-[#F9FAFB] py-16 px-4 sm:px-8 lg:px-24 xl:px-32">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200 p-10">
        <h2 className="text-4xl font-bold text-[#1E2A64] text-center mb-6">
          Qayta aloqa.
        </h2>
        <p className="text-center text-gray-600 mb-10">
          So‘rov qoldiring — mutaxassislarimiz tez orada siz bilan bog‘lanishadi.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Ismingiz"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A64]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="tel"
              placeholder="Telefon raqamingiz"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A64]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E2A64] text-white py-4 text-lg font-semibold rounded-lg hover:bg-blue-900 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>

          {success && (
            <p className="text-green-700 text-center text-lg font-medium mt-4">
              ✅ Muvaffaqiyatli yuborildi. Biz siz bilan tez orada bog‘lanamiz.
            </p>
          )}

          {error && (
            <p className="text-red-600 text-center text-lg font-medium mt-4">
              ❌ {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
