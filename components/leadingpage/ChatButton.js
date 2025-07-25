'use client';

import React, { useEffect, useState } from 'react';

export default function ChatButton() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Chat tarixini yuklash
  useEffect(() => {
    const savedMessages = localStorage.getItem('bm_chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMessage = [
        {
          role: 'assistant',
          content:
            'Salom! Men BM Group virtual yordamchisiman. Narxlar faqat ofisda aniqlanadi. Sizga qanday yordam bera olaman?',
        },
      ];
      setMessages(welcomeMessage);
      localStorage.setItem('bm_chat_history', JSON.stringify(welcomeMessage));
    }
  }, []);

  const updateChatHistory = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem('bm_chat_history', JSON.stringify(newMessages));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    updateChatHistory(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      const botMessage = {
        role: 'assistant',
        content: data.reply || 'Kechirasiz, hozircha maʼlumot topilmadi.',
      };

      updateChatHistory([...updatedMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.',
      };
      updateChatHistory([...updatedMessages, errorMessage]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 left-6 w-80 h-96 bg-white shadow-xl rounded-2xl p-4 flex flex-col z-50">
      <div className="text-lg font-semibold border-b pb-2 mb-2">BM Group Chat</div>
      <div className="flex-1 overflow-y-auto space-y-2 text-sm pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md max-w-[90%] ${
              msg.role === 'user'
                ? 'bg-blue-100 text-blue-900 self-end ml-auto'
                : 'bg-gray-100 text-gray-800 self-start mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">Yuklanmoqda...</div>}
      </div>
      <div className="flex mt-2 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Xabar yozing..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Yuborish
        </button>
      </div>
    </div>
  );
}
