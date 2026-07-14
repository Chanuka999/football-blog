import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Share2,
  UserRound,
} from 'lucide-react';

import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';

import { articles } from '../data/articles';

const ArticleDetails = () => {
  const { slug } = useParams();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const article = articles.find((item) => item.slug === slug);

  const readingTime = useMemo(() => {
    if (!article?.content) return 1;

    const words = article.content.trim().split(/\s+/).length;

    return Math.max(1, Math.ceil(words / 200));
  }, [article]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];

    return articles
      .filter(
        (item) =>
          item.slug !== article.slug &&
          item.category === article.category,
      )
      .slice(0, 3);
  }, [article]);

  const copyArticleLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy article link:', error);
    }
  };

  const openShareWindow = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);

    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    const shareUrl = shareLinks[platform];

    if (!shareUrl) return;

    window.open(
      shareUrl,
      '_blank',
      'noopener,noreferrer,width=720,height=620',
    );
  };

  if (!article) {
    return (
      <main className="min-h-[75vh] bg-slate-50 px-4 py-20">
        <section className="mx-auto max-w-2xl rounded-[32px] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400 text-xl font-black text-slate-950">
            404
          </span>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-lime-600">
            Article unavailable
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            This football story could not be found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            The article may have been removed, renamed or the link may be
            incorrect.
          </p>

          <Link
            to="/articles"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-lime-400 hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Return to articles
          </Link>
        </section>
      </main>
    );
  }

  const paragraphs = article.content
    .trim()
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const authorInitials = article.author
    ?.split(' ')
    .map((name) => name.charAt(0))
    .slice(0, 2)
    .join('');

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* Breadcrumb */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm">
            <Link to="/" className="shrink-0 hover:text-slate-950">
              Home
            </Link>

            <span>/</span>

            <Link
              to="/articles"
              className="shrink-0 hover:text-slate-950"
            >
              Articles
            </Link>

            <span>/</span>

            <span className="truncate font-bold text-slate-950">
              {article.title}
            </span>
          </div>

          <Link
            to="/articles"
            className="hidden shrink-0 items-center gap-2 text-sm font-black text-slate-600 transition hover:text-lime-600 sm:flex"
          >
            <ArrowLeft size={16} />
            All stories
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="absolute left-1/2 top-0 h-full w-px bg-white/5" />

          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-36">
          <div className="max-w-5xl">
            <span className="inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-lime-400">
              {article.category}
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              {article.title}
            </h1>

            {article.description && (
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {article.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5 border-t border-white/10 pt-7">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-400 text-sm font-black text-slate-950">
                  {authorInitials}
                </span>

                <div>
                  <p className="text-xs text-slate-500">Written by</p>
                  <p className="font-black text-white">
                    {article.author}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CalendarDays size={17} className="text-lime-400" />
                <span>{article.publishedDate}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Clock3 size={17} className="text-lime-400" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:-mt-20 sm:px-6 lg:-mt-28 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border-4 border-white bg-white shadow-[0_30px_90px_rgba(15,23,42,0.25)] sm:rounded-[36px]">
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/75 px-4 py-2 text-xs font-bold text-white backdrop-blur sm:bottom-6 sm:left-6">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              GoalVerse Editorial
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      {/* Content */}
<section className="bg-gradient-to-b from-slate-50 via-slate-100/60 to-white">
  <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[130px_minmax(0,820px)_260px] lg:px-8 lg:py-16">

    {/* Share rail */}
    <aside className="hidden lg:block">
      <div className="sticky top-32">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
          Share story
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => openShareWindow('facebook')}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-1 hover:border-lime-400 hover:bg-lime-50 hover:text-slate-950"
            aria-label="Share on Facebook"
          >
            <FaFacebookF size={14} />
          </button>

          <button
            type="button"
            onClick={() => openShareWindow('twitter')}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-1 hover:border-lime-400 hover:bg-lime-50 hover:text-slate-950"
            aria-label="Share on X"
          >
            <FaXTwitter size={14} />
          </button>

          <button
            type="button"
            onClick={() => openShareWindow('linkedin')}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-1 hover:border-lime-400 hover:bg-lime-50 hover:text-slate-950"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn size={14} />
          </button>

          <button
            type="button"
            onClick={copyArticleLink}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-1 hover:border-lime-400 hover:bg-lime-50 hover:text-slate-950"
            aria-label="Copy article link"
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>

        {isCopied && (
          <p className="mt-3 text-[11px] font-bold text-lime-600">
            Link copied
          </p>
        )}
      </div>
    </aside>

    {/* Main article */}
    <article className="min-w-0">

      {/* Mobile share */}
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden">
        <div className="flex items-center gap-2">
          <Share2 size={16} className="text-slate-500" />
          <span className="text-sm font-black text-slate-800">
            Share article
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => openShareWindow('facebook')}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100"
            aria-label="Share on Facebook"
          >
            <FaFacebookF size={13} />
          </button>

          <button
            type="button"
            onClick={() => openShareWindow('twitter')}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100"
            aria-label="Share on X"
          >
            <FaXTwitter size={13} />
          </button>

          <button
            type="button"
            onClick={copyArticleLink}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100"
            aria-label="Copy article link"
          >
            {isCopied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Editorial body */}
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-[#fdfdfb] shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-200 bg-gradient-to-r from-lime-50 via-white to-white px-6 py-5 sm:px-10">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-lime-700">
            GoalVerse feature
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            A carefully written football story for fans who want the
            moments, context and meaning behind the game.
          </p>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-11">
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${article.slug}-${index}`}
              className={`max-w-none text-[16px] leading-[1.95] text-slate-700 sm:text-[18px] ${
                index > 0 ? 'mt-7' : ''
              } ${
                index === 0
                  ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:text-6xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-lime-500'
                  : ''
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Save CTA */}
      <div className="mt-6 overflow-hidden rounded-[26px] border border-slate-800 bg-slate-950 px-6 py-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-lime-400">
              Save for matchday
            </p>

            <h2 className="mt-2 text-xl font-black">
              Keep this story in your favourites
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Bookmark the article and return to it before the next big
              game.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsBookmarked((value) => !value)}
            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition ${
              isBookmarked
                ? 'bg-white text-slate-950'
                : 'bg-lime-400 text-slate-950 hover:bg-lime-300'
            }`}
          >
            <Bookmark
              size={17}
              fill={isBookmarked ? 'currentColor' : 'none'}
            />

            {isBookmarked ? 'Saved' : 'Bookmark'}
          </button>
        </div>
      </div>

      {/* Author card */}
      <div className="mt-6 rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime-400 text-lg font-black text-slate-950">
            {authorInitials}
          </div>

          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
              Written by
            </p>

            <h3 className="mt-1 text-lg font-black text-slate-950">
              {article.author}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Football writer covering player journeys, memorable matches
              and stories from across the beautiful game.
            </p>
          </div>

          <UserRound
            size={36}
            className="hidden text-slate-200 sm:block"
          />
        </div>
      </div>
    </article>

    {/* Sidebar */}
    <aside>
      <div className="sticky top-32 space-y-4">

        <div className="rounded-[24px] bg-slate-950 p-5 text-white shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-slate-950">
            <Clock3 size={18} />
          </span>

          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
            Reading time
          </p>

          <h2 className="mt-2 text-xl font-black">
            {readingTime} minute read
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            A focused football feature with the main moments and details.
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
            Category
          </p>

          <Link
            to="/articles"
            className="mt-4 flex items-center justify-between rounded-xl bg-lime-100 px-4 py-3.5 text-sm font-black text-slate-950 transition hover:bg-lime-400"
          >
            <span>{article.category}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
            Published
          </p>

          <p className="mt-3 text-sm font-black text-slate-950">
            {article.publishedDate}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Published by GoalVerse Editorial.
          </p>
        </div>
      </div>
    </aside>
  </div>
</section>

      {/* Related stories */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-600">
                  Keep reading
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Related football stories
                </h2>
              </div>

              <Link
                to="/articles"
                className="text-sm font-black text-slate-600 transition hover:text-lime-600"
              >
                Browse all articles →
              </Link>
            </div>

            <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/articles/${relatedArticle.slug}`}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-lime-600">
                      {relatedArticle.category}
                    </span>

                    <h3 className="mt-3 text-xl font-black leading-tight text-slate-950 transition group-hover:text-lime-600">
                      {relatedArticle.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                      {relatedArticle.description}
                    </p>

                    <span className="mt-5 inline-flex text-sm font-black text-slate-950">
                      Read story →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ArticleDetails;