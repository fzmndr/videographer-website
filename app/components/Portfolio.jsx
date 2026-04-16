import { portfolioItems } from '../data/siteData'

function Portfolio() {
  return (
    <section id="portfolio" className="section section--dark">
      <div className="container">
        <div className="section-title">
          <p>Portfolio</p>
          <h3>Beberapa karya terbaik kami</h3>
        </div>
        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <article className="portfolio-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div className="portfolio-card__content">
                <span>{item.category}</span>
                <h4>{item.title}</h4>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio