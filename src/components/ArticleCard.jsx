import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays } from 'lucide-react';

const ArticleCard = ({ article }) => {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <Link
        to={`/articles/${article.slug}`}
        className="block overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-lime-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-950">
            {article.category}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <CalendarDays size={14} />
          <span>{article.publishedDate}</span>
        </div>

        <Link to={`/articles/${article.slug}`}>
          <h3 className="mt-4 text-xl font-black leading-tight text-slate-950 transition group-hover:text-lime-600">
            {article.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {article.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Written by
            </p>

            <p className="mt-1 text-sm font-black text-slate-800">
              {article.author}
            </p>
          </div>

          <Link
            to={`/articles/${article.slug}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition duration-300 group-hover:rotate-45 group-hover:bg-lime-400 group-hover:text-slate-950"
            aria-label={`Read ${article.title}`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;