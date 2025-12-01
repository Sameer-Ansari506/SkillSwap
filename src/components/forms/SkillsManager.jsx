import { useState } from 'react';
import Button from '../ui/Button.jsx';
import SkillTag from './SkillTag.jsx';

const SkillsManager = ({ label, skills = [], onChange, placeholder = 'e.g., JavaScript, Guitar, Spanish' }) => {
  const [inputValue, setInputValue] = useState('');
  const [level, setLevel] = useState('beginner');

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    
    const newSkill = {
      name: inputValue.trim(),
      level: level,
      tags: []
    };
    
    onChange([...skills, newSkill]);
    setInputValue('');
    setLevel('beginner');
  };

  const handleRemove = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-bold text-slate-800">{label}</span>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 border-3 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 bg-white shadow-md hover:shadow-lg transition-all font-medium"
          />
          
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border-3 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-400 bg-white shadow-md font-medium"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          
          <Button type="button" onClick={handleAdd} className="btn-gradient px-6">
            ➕ Add
          </Button>
        </div>
      </label>

      {skills.length > 0 && (
        <div className="glass rounded-2xl p-4 space-y-3">
          <p className="text-sm font-bold text-slate-700">Added Skills ({skills.length})</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/50 rounded-full pr-2 shadow-sm">
                <SkillTag label={`${skill.name} (${skill.level})`} />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg hover:scale-125 transition-transform"
                  aria-label="Remove skill"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;

