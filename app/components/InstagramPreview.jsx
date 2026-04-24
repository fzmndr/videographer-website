// app/components/InstagramPreview.jsx

const posts = [
  {
    image: "/images/ig-1.jpg",
    title: "Party Night",
    url: "https://www.instagram.com/dikadoki/",
  },
  {
    image: "/images/ig-2.jpg",
    title: "Wedding",
    url: "https://www.instagram.com/dikadoki/",
  },
  {
    image: "/images/ig-3.jpg",
    title: "Brand Video",
    url: "https://www.instagram.com/dikadoki/",
  },
];

export default function InstagramPreview() {
  return (
    <section className="section instagram-preview">
      <div className="container">
        <div className="instagram-preview__head">
          <p className="section__eyebrow">Instagram</p>
          <h2>Behind the scenes & latest works</h2>
          <a
            href="https://www.instagram.com/dikadoki/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow Instagram →
          </a>
        </div>

        <div className="instagram-preview__grid">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              className="instagram-preview__item"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Lihat ${post.title} di Instagram`}
            >
              <img src={post.image} alt={post.title} />
              <span>{post.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}