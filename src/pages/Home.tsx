import { Logo } from '../components/Logo';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-raven-darker bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-raven-light/20 via-raven-darker to-raven-darker">
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center border-b border-raven-border/50 bg-raven-darker/80 backdrop-blur-md">
        <Logo />
        <div className="flex gap-4 font-mono text-sm">
          <Link to="/login" className="px-4 py-2 text-raven-text hover:text-raven-accent transition-colors">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 bg-raven-light border border-raven-border rounded hover:border-raven-accent/50 hover:text-raven-accent transition-colors shadow-lg">
            Initialize Session
          </Link>
        </div>
      </div>

      <div className="max-w-3xl text-center space-y-8 mt-16 p-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raven-danger/10 text-raven-danger border border-raven-danger/20 font-mono text-xs font-medium tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(255,59,48,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-raven-danger opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-raven-danger"></span>
          </span>
          System Online
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter">
          Trace the Attack.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-raven-textTitle to-raven-text">Measure the Impact.</span>
        </h1>
        
        <p className="text-xl text-raven-text font-light max-w-2xl mx-auto leading-relaxed">
          Ransomware Attack Visualization and Event Navigator. 
          Advanced telemetry processing and forensic reconstruction for modern incident response.
        </p>

        <div className="flex items-center justify-center gap-6 pt-8">
          <Link to="/dashboard" className="group relative px-8 py-3 bg-raven-accent text-raven-darker font-mono font-bold tracking-widest uppercase rounded hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            Access Dashboard
            <div className="absolute inset-0 border border-raven-accent rounded opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
