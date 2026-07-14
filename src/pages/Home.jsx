import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="absolute left-1/2 top-0 h-full w-px bg-white/5" />

          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        </div>

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2">
              <TrendingUp size={15} className="text-lime-400" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-lime-400">
                Football stories and analysis
              </span>
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              The beautiful game,
              <span className="block text-lime-400">
                one story at a time.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Read original football stories, player journeys, match
              analysis and unforgettable moments from around the world.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-lime-300"
              >
                Explore articles
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                About GoalVerse
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-5 rotate-3 rounded-[40px] border border-lime-400/20" />

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80"
                alt="Football stadium"
                className="h-[420px] w-full rounded-[28px] object-cover"
              />

              <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-slate-950/80 p-5 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-400">
                  Featured story
                </p>

                <h2 className="mt-2 text-xl font-black text-white">
                  Discover the stories behind football’s greatest moments
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-600">
              Latest posts
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Featured football articles
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore player stories, football history and match analysis
              written for true fans of the game.
            </p>
          </div>

          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm font-black text-slate-950 transition hover:text-lime-600"
          >
            View all articles
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;