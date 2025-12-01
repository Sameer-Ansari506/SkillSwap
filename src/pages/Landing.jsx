import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';

const steps = [
  { icon: '👤', title: 'Create Profile', desc: 'List skills you teach and want to learn' },
  { icon: '🔍', title: 'Discover Peers', desc: 'Browse mentors and learners worldwide' },
  { icon: '🤝', title: 'Start Swapping', desc: 'Send requests, schedule, and learn together' }
];

const features = [
  { icon: '⚡', title: 'Instant Match', desc: 'AI-powered skill matching' },
  { icon: '💬', title: 'Real-time Chat', desc: 'Connect via in-app or WhatsApp' },
  { icon: '⭐', title: 'Peer Reviews', desc: 'Build trust with ratings' },
  { icon: '📅', title: 'Easy Scheduling', desc: 'Propose and confirm sessions' }
];

const Landing = () => (
  <div className="min-h-screen">
    <section className="max-w-7xl mx-auto px-4 py-20 space-y-20 animate-fade-in">
      {/* Hero */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-slide-up">
          <div className="inline-block">
            <span className="px-4 py-2 bg-gradient-to-r from-brand-100 to-accent-100 text-brand-700 rounded-full text-sm font-semibold">
              🎓 Peer tutoring reimagined
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Trade <span className="gradient-text">knowledge</span>,<br />
            grow <span className="gradient-text">faster</span>.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            SkillSwap connects learners worldwide. Teach guitar for French, code for design—the possibilities are endless.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register">
              <Button className="btn-gradient text-lg px-8 py-3 shadow-lg hover:shadow-xl">
                Get started free
              </Button>
            </Link>
            <Link to="/discover">
              <Button variant="secondary" className="text-lg px-8 py-3">
                Explore skills
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="glass rounded-3xl p-8 shadow-2xl card-hover space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl">Upcoming Session</h3>
              <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-semibold">
                Tomorrow
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xl">
                  🎸
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">Spanish ↔️ Guitar</p>
                  <p className="text-sm text-slate-500">Exchange session</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>📅 Tomorrow • 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>💻 Online meeting</span>
              </div>
            </div>
            <Button className="w-full btn-gradient-accent">Join Session</Button>
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-200 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-200 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
        </div>
      </div>

      {/* How it works */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">How it works</h2>
          <p className="text-xl text-slate-600">Start swapping skills in three simple steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="glass rounded-2xl p-8 card-hover text-center space-y-4"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-5xl mb-4 animate-bounce-slow">{step.icon}</div>
              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Why SkillSwap?</h2>
          <p className="text-xl text-slate-600">Everything you need to learn and teach</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="glass rounded-xl p-6 card-hover space-y-3">
              <div className="text-4xl">{feature.icon}</div>
              <h4 className="font-bold text-lg">{feature.title}</h4>
              <p className="text-sm text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="glass rounded-3xl p-12 text-center space-y-6 shadow-2xl">
        <h2 className="text-4xl font-bold gradient-text">Ready to start learning?</h2>
        <p className="text-xl text-slate-600">Join thousands of learners trading skills every day</p>
        <Link to="/register">
          <Button className="btn-gradient text-lg px-10 py-4 shadow-lg hover:shadow-xl">
            Create free account
          </Button>
        </Link>
      </div>
    </section>
  </div>
);

export default Landing;
