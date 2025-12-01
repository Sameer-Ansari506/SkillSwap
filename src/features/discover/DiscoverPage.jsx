import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../users/usersSlice.js';
import { setSearch, setLocation } from './discoverSlice.js';
import useDebouncedSearch from '../../hooks/useDebouncedSearch.js';
import UserCard from './UserCard.jsx';
import Input from '../../components/ui/Input.jsx';

const DiscoverPage = () => {
  const dispatch = useDispatch();
  const { search, location } = useSelector((state) => state.discover);
  const { list } = useSelector((state) => state.users);
  const debounced = useDebouncedSearch(search, 300);
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    dispatch(fetchUsers({ q: debounced, location, skill: skillFilter }));
  }, [dispatch, debounced, location, skillFilter]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-2 sm:space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text text-glow">Discover Mentors 🌟</h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-medium">Find the perfect skill match and start learning 🚀</p>
      </div>
      
      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <Input label="🔍 Search by name" value={search} onChange={(e) => dispatch(setSearch(e.target.value))} />
          <Input label="📍 Location" value={location} onChange={(e) => dispatch(setLocation(e.target.value))} />
          <Input label="🎯 Skill" value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {list.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
      
      {list.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-5xl sm:text-6xl mb-3 sm:mb-4">🔍</p>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600">No users found. Try adjusting your filters.</p>
        </div>
      )}
    </section>
  );
};

export default DiscoverPage;
