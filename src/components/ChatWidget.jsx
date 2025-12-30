import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi! I am the EdVoyage AI Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages([...messages, { type: 'user', text: userMessage }]);
        setInput('');

        // Mock bot response
        setTimeout(() => {
            let botResponse = "I'm a prototype AI. I can't answer that yet, but I'm learning!";

            if (userMessage.toLowerCase().includes('apply')) {
                botResponse = "To apply, navigate to the 'Explore' page, select a program you like, and click the 'Apply Now' button. Make sure your profile is 100% complete first!";
            } else if (userMessage.toLowerCase().includes('scholarship')) {
                botResponse = "We have many scholarships available! Check the 'Scholarships' tab in your dashboard to match with ones that fit your profile.";
            }

            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-xl w-80 mb-4 border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-300">
                    <div className="bg-primary p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="font-semibold">AI Assistant</span>
                        </div>
                        <button onClick={toggleChat} className="hover:bg-primary-dark rounded-full p-1 transition">
                            <X size={18} />
                        </button>
                    </div>
                    <div className="h-80 p-4 overflow-y-auto bg-slate-50 space-y-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-xl p-3 text-sm ${msg.type === 'user'
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Suggested Questions */}
                    <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
                        <button
                            onClick={() => setInput("How do I apply?")}
                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-full border border-slate-200 transition whitespace-nowrap"
                        >
                            How do I apply?
                        </button>
                        <button
                            onClick={() => setInput(" scholarship info")}
                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-full border border-slate-200 transition whitespace-nowrap"
                        >
                            Scholarship info
                        </button>
                    </div>

                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 px-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:opacity-90 transition">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
            <button
                onClick={toggleChat}
                className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 group"
            >
                <MessageCircle size={24} />
                <span className={`max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap`}>
                    Chat with AI
                </span>
            </button>
        </div>
    );
};

export default ChatWidget;
