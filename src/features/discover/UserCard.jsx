import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button.jsx';
import Rating from '../../components/ui/Rating.jsx';
import SkillTag from '../../components/forms/SkillTag.jsx';
import { createRequestAsync } from '../requests/requestsSlice.js';
import useAuth from '../../hooks/useAuth.js';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  const handleRequest = () => {
    if (!isAuthenticated) {
      toast.error('Log in to request a swap.');
      return;
    }
    const defaultSlots = [1, 3].map((days) => ({
      proposedTime: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
      note: `Auto-suggested slot in ${days} day(s)`
    }));
    dispatch(
      createRequestAsync({
        toUser: user._id,
        offeredSkill: user.skillsToLearn?.[0]?.name || 'General mentoring',
        requestedSkill: user.skillsToTeach?.[0]?.name || 'Knowledge share',
        description: 'Automated request via Discover page',
        scheduleProposals: defaultSlots
      })
    )
      .unwrap()
      .then(() => toast.success('Request sent! We will notify you when accepted.'))
      .catch(() => toast.error('Could not send request'));
  };

  const avatarColors = [
    'from-blue-400 to-cyan-500',
    'from-purple-400 to-pink-500',
    'from-emerald-400 to-teal-500',
    'from-orange-400 to-amber-500',
    'from-rose-400 to-pink-500',
  ];
  const avatarColor = avatarColors[Math.abs(user.name?.charCodeAt(0) || 0) % avatarColors.length];

  return (
    <div className="glass rounded-3xl p-6 space-y-5 shadow-xl card-hover border-2 border-white/40 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-2xl"></div>
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-2xl font-bold shadow-lg transform hover:rotate-6 transition-transform`}>
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-600 flex items-center gap-1 font-medium">
              📍 {user.location || 'Remote'}
            </p>
            {user.matchScore > 0 && (
              <p className="text-xs text-purple-600 font-semibold mt-1">
                ✨ {user.matchScore}% Match
              </p>
            )}
          </div>
        </div>
        <Rating value={user.rating || 0} />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {user.skillsToTeach?.slice(0, 4).map((skill) => (
          <SkillTag key={skill.name} label={skill.name} />
        ))}
        {user.skillsToTeach?.length > 4 && (
          <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
            +{user.skillsToTeach.length - 4} more
          </span>
        )}
      </div>
      
      <div className="flex gap-3 pt-2">
        <Button className="flex-1 btn-gradient text-white font-bold" onClick={handleRequest}>
          🤝 Request Swap
        </Button>
        {user.whatsappNumber && (
          <a
            href={`https://wa.me/${user.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1"
          >
            <Button variant="success" className="w-full font-bold">
              💬 WhatsApp
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default UserCard;
