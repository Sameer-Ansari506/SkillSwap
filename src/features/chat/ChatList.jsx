import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchBookings } from '../bookings/bookingsSlice.js';
import { fetchMessages, setActivePartner } from './chatSlice.js';
import ChatWindow from './ChatWindow.jsx';

const ChatList = () => {
  const dispatch = useDispatch();
  const { items: bookings } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.auth);
  const { activePartner } = useSelector((state) => state.chat);
  const currentUserId = user?.id || user?._id;

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  // Get unique list of users from accepted bookings
  const connectedUsers = useMemo(() => {
    const userMap = new Map();
    bookings.forEach((booking) => {
      if (!booking.request) return;
      const { fromUser, toUser } = booking.request;
      
      // Add the other user (not current user)
      if (fromUser?._id === currentUserId || fromUser === currentUserId) {
        if (toUser && toUser._id) {
          userMap.set(toUser._id, toUser);
        }
      } else if (toUser?._id === currentUserId || toUser === currentUserId) {
        if (fromUser && fromUser._id) {
          userMap.set(fromUser._id, fromUser);
        }
      }
    });
    return Array.from(userMap.values());
  }, [bookings, currentUserId]);

  const handleSelect = (id) => {
    dispatch(setActivePartner(id));
    dispatch(fetchMessages(id));
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
      <div className="glass rounded-2xl p-6 space-y-4 shadow-lg">
        <h3 className="font-bold text-lg gradient-text">💬 Connected Users</h3>
        <p className="text-xs text-slate-500">Chat with users you have bookings with</p>
        <div className="space-y-2">
          {connectedUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => handleSelect(user._id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                activePartner === user._id
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg'
                  : 'hover:bg-brand-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className={`font-semibold ${activePartner === user._id ? 'text-white' : 'text-slate-900'}`}>
                    {user.name}
                  </p>
                  <p className={`text-xs ${activePartner === user._id ? 'text-white/80' : 'text-slate-500'}`}>
                    {user.location || 'Remote'}
                  </p>
                </div>
              </div>
            </button>
          ))}
          {connectedUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">👥</p>
              <p className="text-sm text-slate-500">No connections yet. Complete a booking to chat!</p>
            </div>
          )}
        </div>
      </div>
      <div className="md:col-span-2">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatList;
