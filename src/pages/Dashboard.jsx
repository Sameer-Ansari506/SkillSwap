import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import { fetchRequests } from '../features/requests/requestsSlice.js';
import { fetchBookings } from '../features/bookings/bookingsSlice.js';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: requests } = useSelector((state) => state.requests);
  const { items: bookings } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchRequests());
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold gradient-text">Welcome back, {user?.name}! 👋</h2>
            <p className="text-slate-700 mt-1 font-medium">Manage your skills, requests, and bookings.</p>
          </div>
          <Link to="/profile/edit/me">
            <Button variant="secondary" className="font-bold">✏️ Update profile</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="My Skills" value={user?.skillsToTeach?.length || 0} icon="🎯" color="purple" />
        <StatCard title="Pending Requests" value={requests.filter((r) => r.status === 'pending').length} icon="📬" color="accent" />
        <StatCard title="Upcoming Bookings" value={bookings.filter((b) => !b.isCompleted).length} icon="📅" color="brand" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Panel title="📅 Upcoming Bookings" icon="📅">
          {bookings.slice(0, 3).map((booking) => (
            <div key={booking._id} className="flex justify-between items-center p-3 rounded-lg hover:bg-brand-50 transition-colors">
              <div>
                <p className="font-medium text-slate-900">{new Date(booking.confirmedSchedule).toLocaleString()}</p>
                <p className="text-xs text-slate-500 capitalize">{booking.meetingType}</p>
              </div>
              <span className="text-2xl">💻</span>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-slate-500 text-sm text-center py-4">No bookings yet. Start exploring!</p>}
        </Panel>
        <Panel title="🤝 Recent Requests" icon="🤝">
          {requests.slice(0, 3).map((req) => (
            <div key={req._id} className="flex justify-between items-center p-3 rounded-lg hover:bg-accent-50 transition-colors">
              <div>
                <p className="font-medium text-slate-900">
                  {req.offeredSkill} ↔️ {req.requestedSkill}
                </p>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 capitalize">{req.status}</span>
              </div>
            </div>
          ))}
          {requests.length === 0 && <p className="text-slate-500 text-sm text-center py-4">No requests yet. Browse the discover page!</p>}
        </Panel>
      </div>
    </div>
  );
};

const Panel = ({ title, children }) => (
  <div className="glass rounded-2xl p-6 space-y-4 shadow-lg card-hover">
    <h3 className="font-bold text-lg text-slate-900">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const StatCard = ({ title, value, icon, color }) => {
  const gradients = {
    brand: 'from-blue-500 to-cyan-500',
    accent: 'from-emerald-500 to-teal-500',
    purple: 'from-purple-500 to-pink-500'
  };
  
  return (
    <div className={`glass rounded-3xl p-6 shadow-2xl card-hover border-4 border-white/50 bg-gradient-to-br ${gradients[color] || gradients.brand} relative overflow-hidden`}>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-white/90 uppercase tracking-wide">{title}</p>
          <span className="text-5xl drop-shadow-2xl">{icon}</span>
        </div>
        <p className="text-5xl font-black text-white drop-shadow-lg">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
