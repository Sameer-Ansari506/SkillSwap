import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { registerUser } from './authSlice.js';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import SkillsManager from '../../components/forms/SkillsManager.jsx';
import toast from 'react-hot-toast';
import { Icons, Icon } from '../../utils/icons.jsx';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  whatsappNumber: yup.string().matches(/^[0-9]+$/, 'Numbers only').optional()
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => ({ isAuthenticated: Boolean(state.auth.token) }));
  const [skillsToTeach, setSkillsToTeach] = useState([]);
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) });

  // Debug: Log when skills change
  useEffect(() => {
    console.log('RegisterPage: skillsToTeach updated:', skillsToTeach);
  }, [skillsToTeach]);

  useEffect(() => {
    console.log('RegisterPage: skillsToLearn updated:', skillsToLearn);
  }, [skillsToLearn]);

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        skillsToTeach,
        skillsToLearn
      };
      console.log('RegisterPage: Submitting with skills:', {
        skillsToTeach,
        skillsToLearn,
        fullPayload: payload
      });
      await dispatch(registerUser(payload)).unwrap();
      toast.success('Welcome to SkillSwap! 🎉');
      navigate('/dashboard');
    } catch (error) {
      console.error('RegisterPage: Registration error:', error);
      toast.error(error?.message || 'Registration failed');
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-slow">
            <Icon icon={Icons.fireSolid} size="3xl" className="text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text text-glow mb-2 sm:mb-3">Join SkillSwap</h2>
          <p className="text-base sm:text-lg lg:text-xl text-white font-semibold drop-shadow-lg flex items-center justify-center gap-2">
            Start trading skills with peers worldwide
            <Icon icon={Icons.globe} size="lg" className="text-white" />
          </p>
        </div>
        <div className="glass rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 sm:space-y-6 border-2 sm:border-4 border-white/40 neon-border max-h-[85vh] overflow-y-auto">
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Full Name" {...register('name')} error={errors.name?.message} />
            <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
            <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
            <Input
              label="WhatsApp number (optional)"
              placeholder="15551234567"
              {...register('whatsappNumber')}
              error={errors.whatsappNumber?.message}
            />
            
            <div className="border-t-2 border-purple-200 pt-4 sm:pt-5">
              <h3 className="text-base sm:text-lg font-bold gradient-text mb-3 sm:mb-4 flex items-center gap-2">
                <Icon icon={Icons.trophy} size="lg" />
                Your Skills
              </h3>
              <SkillsManager
                label="What can you teach?"
                skills={skillsToTeach}
                onChange={setSkillsToTeach}
                placeholder="e.g., JavaScript, Guitar, Spanish"
              />
            </div>
            
            <div className="border-t-2 border-purple-200 pt-4 sm:pt-5">
              <SkillsManager
                label="What do you want to learn?"
                skills={skillsToLearn}
                onChange={setSkillsToLearn}
                placeholder="e.g., Python, Piano, French"
              />
            </div>
            
            <Button type="submit" className="w-full btn-gradient text-base sm:text-lg py-3 sm:py-4 flex items-center gap-2 justify-center" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icon icon={Icons.clock} size="md" className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <Icon icon={Icons.rocket} size="md" />
                  Sign up free
                </>
              )}
            </Button>
          </form>
          <p className="text-center text-xs sm:text-sm font-semibold text-slate-700">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-bold underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
