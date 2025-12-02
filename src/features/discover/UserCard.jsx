import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button.jsx';
import Rating from '../../components/ui/Rating.jsx';
import SkillTag from '../../components/forms/SkillTag.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Input from '../../components/ui/Input.jsx';
import { createRequestAsync } from '../requests/requestsSlice.js';
import useAuth from '../../hooks/useAuth.js';
import { Icons, Icon } from '../../utils/icons.jsx';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      offeredSkill: '',
      requestedSkill: '',
      description: '',
      proposedTime1: '',
      proposedTime2: '',
      meetingLink: ''
    }
  });

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      toast.error('Log in to request a swap.');
      return;
    }
    // Pre-fill with user's skills
    reset({
      offeredSkill: user.skillsToLearn?.[0]?.name || '',
      requestedSkill: user.skillsToTeach?.[0]?.name || '',
      description: '',
      proposedTime1: '',
      proposedTime2: '',
      meetingLink: ''
    });
    setIsModalOpen(true);
  };

  const onSubmit = (values) => {
    const scheduleProposals = [];
    if (values.proposedTime1) {
      scheduleProposals.push({
        proposedTime: new Date(values.proposedTime1).toISOString(),
        note: 'First preference'
      });
    }
    if (values.proposedTime2) {
      scheduleProposals.push({
        proposedTime: new Date(values.proposedTime2).toISOString(),
        note: 'Alternative time'
      });
    }

    dispatch(
      createRequestAsync({
        toUser: user._id,
        offeredSkill: values.offeredSkill || 'General mentoring',
        requestedSkill: values.requestedSkill || 'Knowledge share',
        description: values.description || 'Request from Discover page',
        scheduleProposals: scheduleProposals.length > 0 ? scheduleProposals : undefined,
        meetingLink: values.meetingLink || undefined
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Request sent! We will notify you when accepted.');
        setIsModalOpen(false);
        reset();
      })
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
    <>
    <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-xl card-hover border-2 border-white/40 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-2xl"></div>
      
      <div className="flex flex-col sm:flex-row items-start justify-between relative z-10 gap-3 sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg transform hover:rotate-6 transition-transform flex-shrink-0`}>
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg sm:text-xl font-bold text-slate-900 truncate">{user.name}</p>
            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1 font-medium">
              <Icon icon={Icons.location} size="sm" />
              {user.location || 'Remote'}
            </p>
            {user.matchScore > 0 && (
              <p className="text-xs text-purple-600 font-semibold mt-1 flex items-center gap-1">
                <Icon icon={Icons.sparklesSolid} size="sm" />
                {user.matchScore}% Match
              </p>
            )}
          </div>
        </div>
        <div className="self-end sm:self-auto">
          <Rating value={user.rating || 0} />
        </div>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {user.skillsToTeach?.slice(0, 4).map((skill) => (
          <SkillTag key={skill.name} label={skill.name} />
        ))}
        {user.skillsToTeach?.length > 4 && (
          <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
            +{user.skillsToTeach.length - 4} more
          </span>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
        <Button className="flex-1 btn-gradient text-white font-bold text-sm sm:text-base flex items-center gap-2 justify-center" onClick={handleOpenModal}>
          <Icon icon={Icons.handshake} size="md" />
          Request Swap
        </Button>
        {user.whatsappNumber && (
          <a
            href={`https://wa.me/${user.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1"
          >
            <Button variant="success" className="w-full font-bold text-sm sm:text-base flex items-center gap-2 justify-center">
              <Icon icon={Icons.chat} size="md" />
              WhatsApp
            </Button>
          </a>
        )}
      </div>

      {/* Request Modal */}
      <Modal
        title={`Request Swap with ${user.name}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* User Info Banner */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0`}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-slate-900">{user.name}</p>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                <Icon icon={Icons.mapPin} size="sm" />
                {user.location || 'Remote'}
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Icon icon={Icons.handRaised} size="md" className="text-purple-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <Input
                  label="What can you offer?"
                  placeholder="e.g., JavaScript, Guitar"
                  {...register('offeredSkill', { required: 'This field is required' })}
                  error={errors.offeredSkill?.message}
                />
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Icon icon={Icons.academicCap} size="md" className="text-blue-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <Input
                  label="What do you want to learn?"
                  placeholder="e.g., Python, Piano"
                  {...register('requestedSkill', { required: 'This field is required' })}
                  error={errors.requestedSkill?.message}
                />
              </div>
            </div>
          </div>
          
          {/* Message */}
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-bold text-slate-800 flex items-center gap-2">
              <Icon icon={Icons.chatBubbleLeftRight} size="sm" className="text-emerald-500" />
              Message (optional)
            </span>
            <textarea
              {...register('description')}
              className="border-3 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 bg-white shadow-md hover:shadow-lg transition-all font-medium"
              rows={3}
              placeholder="Tell them why you'd like to connect..."
            />
          </label>

          {/* Schedule Section */}
          <div className="border-t-2 border-purple-200 pt-4 space-y-3">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <Icon icon={Icons.calendarDays} size="md" className="text-orange-500" />
              Suggest Session Times (optional)
            </h4>
            
            <Input
              type="datetime-local"
              label="First preference"
              {...register('proposedTime1')}
            />
            
            <Input
              type="datetime-local"
              label="Alternative time"
              {...register('proposedTime2')}
            />
          </div>

          {/* Meeting Link */}
          <div className="flex items-start gap-2">
            <Icon icon={Icons.link} size="md" className="text-cyan-500 mt-7 flex-shrink-0" />
            <div className="flex-1">
              <Input
                label="Meeting Link (optional)"
                placeholder="e.g., Zoom, Google Meet, or location"
                {...register('meetingLink')}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="flex-1 btn-gradient flex items-center gap-2 justify-center text-base py-3">
              <Icon icon={Icons.paperAirplane} size="md" />
              Send Request
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-3"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
    </>
  );
};

export default UserCard;
