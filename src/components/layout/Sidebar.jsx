import { NavLink } from 'react-router-dom';

const items = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Requests', to: '/requests' },
  { label: 'Bookings', to: '/bookings' },
  { label: 'Chat', to: '/chat' }
];

const Sidebar = () => (
  <aside className="gradient-bg-alt min-h-screen w-64 p-6 space-y-6 shadow-2xl">
    <h4 className="font-black text-white uppercase text-sm tracking-wider drop-shadow-lg">Navigation</h4>
    <nav className="flex flex-col gap-3">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `px-5 py-3 rounded-xl font-bold transition-all ${
              isActive 
                ? 'bg-white text-purple-600 shadow-xl scale-105 neon-border' 
                : 'text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg backdrop-blur-sm'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
