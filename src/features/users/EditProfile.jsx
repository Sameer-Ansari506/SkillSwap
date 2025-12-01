import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import SkillsManager from '../../components/forms/SkillsManager.jsx';
import { updateProfileAsync } from './usersSlice.js';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset } = useForm({ defaultValues: user });
  const [skillsToTeach, setSkillsToTeach] = useState([]);
  const [skillsToLearn, setSkillsToLearn] = useState([]);

  useEffect(() => {
    if (user) {
      reset(user);
      setSkillsToTeach(user.skillsToTeach || []);
      setSkillsToLearn(user.skillsToLearn || []);
    }
  }, [user, reset]);

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        skillsToTeach,
        skillsToLearn
      };
      await dispatch(updateProfileAsync(payload)).unwrap();
      toast.success('Profile updated! 🎉');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">
      <div className="glass rounded-3xl p-6 shadow-2xl">
        <h2 className="text-4xl font-bold gradient-text">✏️ Edit Profile</h2>
        <p className="text-slate-700 mt-2">Update your information and skills</p>
      </div>
      
      <form className="glass rounded-3xl p-8 space-y-6 shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <Input label="Name" {...register('name')} />
          <Input label="Location" {...register('location')} placeholder="e.g., New York, USA" />
          <Input label="WhatsApp Number" {...register('whatsappNumber')} placeholder="15551234567" />
          
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-bold text-slate-800">Bio</span>
            <textarea
              {...register('bio')}
              className="border-3 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 bg-white shadow-md hover:shadow-lg transition-all font-medium"
              rows={4}
              placeholder="Share your learning story and what makes you unique..."
            />
          </label>
        </div>
        
        <div className="border-t-2 border-purple-200 pt-6">
          <h3 className="text-xl font-bold gradient-text mb-4">🎯 Skills Management</h3>
          <div className="space-y-6">
            <SkillsManager
              label="What can you teach?"
              skills={skillsToTeach}
              onChange={setSkillsToTeach}
              placeholder="e.g., JavaScript, Guitar, Spanish"
            />
            
            <SkillsManager
              label="What do you want to learn?"
              skills={skillsToLearn}
              onChange={setSkillsToLearn}
              placeholder="e.g., Python, Piano, French"
            />
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1 btn-gradient text-lg py-3">
            💾 Save Changes
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => navigate('/dashboard')}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
