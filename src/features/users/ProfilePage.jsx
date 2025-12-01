import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import SkillTag from '../../components/forms/SkillTag.jsx';
import { fetchProfile } from './usersSlice.js';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selected } = useSelector((state) => state.users);

  useEffect(() => {
    if (id) dispatch(fetchProfile(id));
  }, [dispatch, id]);

  if (!selected) return <p>Loading profile...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{selected.name}</h2>
          <p className="text-slate-500">{selected.bio || 'Loves sharing knowledge'}</p>
        </div>
        {selected.whatsappNumber && (
          <Button
            variant="success"
            as="a"
            href={`https://wa.me/${selected.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </Button>
        )}
      </div>
      <section>
        <h3 className="font-semibold mb-2">Skills to teach</h3>
        <div className="flex gap-2 flex-wrap">
          {selected.skillsToTeach?.map((skill) => (
            <SkillTag key={skill.name} label={`${skill.name} (${skill.level})`} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="font-semibold mb-2">Skills to learn</h3>
        <div className="flex gap-2 flex-wrap">
          {selected.skillsToLearn?.map((skill) => (
            <SkillTag key={skill.name} label={skill.name} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
