import React from 'react'
import ArticleCard from '../components/ArticleCard'


const Articles = () => {
  return (
    <section className="section container">
      <div className="page-heading">
        <span>Football content</span>
        <h1>Latest Articles</h1>
        <p>
          Explore football stories, player profiles, match analysis and
          historical moments.
        </p>
      </div>

      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default Articles
