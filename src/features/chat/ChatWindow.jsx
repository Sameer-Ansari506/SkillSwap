import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/ui/Button.jsx';
import useSocket from '../../hooks/useSocket.js';
import { receiveSocketMessage, sendMessageAsync } from './chatSlice.js';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const socketRef = useSocket();
  const { activePartner, byUser } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState('');
  const messages = byUser[activePartner] || [];
  const messagesEndRef = useRef(null);
  const currentUserId = user?.id || user?._id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socketRef.current) return undefined;
    const socket = socketRef.current;
    
    const handleMessage = (payload) => {
      // Determine which user this message is with
      const partnerId = payload.from === currentUserId ? payload.to : payload.from;
      dispatch(receiveSocketMessage({ partnerId, message: payload }));
    };
    
    socket.on('chat:message', handleMessage);
    return () => {
      socket.off('chat:message', handleMessage);
    };
  }, [dispatch, socketRef, currentUserId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !activePartner) return;
    dispatch(sendMessageAsync({ to: activePartner, text }));
    setText('');
  };

  if (!activePartner) {
    return (
      <div className="glass rounded-2xl p-12 text-center shadow-lg h-full flex items-center justify-center">
        <div>
          <p className="text-6xl mb-4">💬</p>
          <p className="text-xl text-slate-600">Select a contact to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl shadow-lg flex flex-col h-[600px]">
      <div className="p-4 border-b border-white/20">
        <h3 className="font-bold text-lg gradient-text">Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-4xl mb-2">👋</p>
            <p className="text-sm text-slate-500">Start the conversation!</p>
          </div>
        )}
        {messages.map((message, idx) => {
          const isOwn = message.from === currentUserId || message.from === user?._id;
          return (
            <div
              key={message._id || idx}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-md ${
                isOwn
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white'
                  : 'bg-white text-slate-900'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${isOwn ? 'text-white/70' : 'text-slate-400'}`}>
                  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="p-4 border-t border-white/20 flex gap-3" onSubmit={handleSend}>
        <input
          className="flex-1 border-2 border-brand-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          value={text}
          placeholder="Type your message..."
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" className="btn-gradient px-6">
          Send 📤
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
