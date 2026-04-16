import { testimonials } from '../data/siteData'

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <p>Testimoni</p>
          <h3>Apa kata klien kami</h3>
        </div>
        <div className="card-grid">
          {testimonials.map((item) => (
            <article className="card" key={item.name}>
              <p>“{item.text}”</p>
              <h4>{item.name}</h4>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials