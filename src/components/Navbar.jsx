import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Trophy,
  CircleUserRound,
  ArrowUpRight,
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Articles',
      path: '/articles',
    },
    {
      name: 'Players',
      path: '/players',
    },
    {
      name: 'Matches',
      path: '/matches',
    },
    {
      name: 'About',
      path: '/about',
    },
  ];

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Top news strip */}
        <div className="bg-lime-400 text-slate-950">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex shrink-0 items-center gap-2 border-r border-slate-900/20 pr-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-lime-400">
                <Trophy size={13} />
              </span>

              <span className="text-[11px] font-black uppercase tracking-[0.18em]">
                Matchday
              </span>
            </div>

            <div className="overflow-hidden">
              <p className="whitespace-nowrap text-xs font-semibold sm:text-sm">
                Latest football stories, player journeys and match analysis
                from around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="border-b border-white/10 bg-slate-950/95 text-white shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-[82px] items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                className="group flex items-center gap-3"
                onClick={closeMobileMenu}
              >
                <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-lime-400 text-slate-950 shadow-lg shadow-lime-400/20 transition duration-300 group-hover:-rotate-6">
                  <div className="absolute -right-3 -top-3 h-8 w-8 rounded-full border border-slate-950/20" />
                  <div className="absolute -bottom-3 -left-3 h-8 w-8 rounded-full border border-slate-950/20" />

                  <span className="text-lg font-black">GV</span>
                </div>

                <div className="leading-none">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-tight sm:text-2xl">
                      Goal
                      <span className="text-lime-400">Verse</span>
                    </span>

                    <ArrowUpRight
                      size={15}
                      className="text-lime-400 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em] text-slate-500">
                    Beyond the ninety
                  </p>
                </div>
              </Link>

              {/* Desktop navigation */}
              <nav className="hidden items-center gap-1 lg:flex">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300 ${
                        isActive
                          ? 'bg-white text-slate-950'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.name}

                        {isActive && (
                          <span className="absolute -bottom-[22px] left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-lime-400" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Desktop actions */}
              <div className="hidden items-center gap-3 lg:flex">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-lime-400/50 hover:bg-lime-400 hover:text-slate-950"
                  aria-label="Open search"
                >
                  <Search size={19} />
                </button>

                <Link
                  to="/about"
                  className="group flex items-center gap-3 rounded-full bg-lime-400 py-2 pl-2 pr-5 text-sm font-black text-slate-950 transition duration-300 hover:bg-lime-300"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-lime-400">
                    <CircleUserRound size={17} />
                  </span>

                  Join the fans
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Search area */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isSearchOpen
                  ? 'max-h-28 pb-5 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 p-2">
                <Search className="ml-3 text-slate-500" size={19} />

                <input
                  type="text"
                  placeholder="Search players, clubs, matches..."
                  className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600"
                />

                <button
                  type="button"
                  className="rounded-xl bg-lime-400 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-950 transition hover:bg-lime-300"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`overflow-hidden border-b border-white/10 bg-slate-950 text-white transition-all duration-300 lg:hidden ${
            isMenuOpen
              ? 'max-h-[600px] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-2 px-4 py-5">
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-bold transition ${
                    isActive
                      ? 'bg-lime-400 text-slate-950'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs opacity-50">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {item.name}
                </span>

                <ArrowUpRight size={16} />
              </NavLink>
            ))}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-bold text-white"
              >
                <Search size={18} />
                Search Football Stories
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search modal-like section */}
      {isSearchOpen && (
        <div className="border-b border-slate-800 bg-slate-900 px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center rounded-2xl border border-white/10 bg-slate-950 p-2">
            <Search className="ml-3 text-slate-500" size={18} />

            <input
              type="text"
              placeholder="Search football stories..."
              className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600"
            />

            <button
              type="button"
              className="rounded-xl bg-lime-400 px-4 py-3 text-xs font-black text-slate-950"
            >
              Go
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;