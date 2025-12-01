const Footer = () => (
  <footer className="gradient-bg text-white py-12 mt-20 shadow-2xl border-t-4 border-white/30">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🎓
          </div>
          <span className="text-3xl font-black drop-shadow-lg">SkillSwap</span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="font-bold drop-shadow-lg">© {new Date().getFullYear()} SkillSwap. Built for peer learning.</p>
          <p className="text-sm text-white/80 drop-shadow">Made with ❤️ for learners worldwide 🌍</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
