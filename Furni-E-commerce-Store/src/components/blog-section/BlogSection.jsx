
import { Link } from "react-router-dom";

export default function BlogSection() {
  const articles = [
    {
      title: "Making Your First Home Feel Like Yours",
      description:
        "Simple furniture ideas to help create a comfortable and welcoming home.",
      image: "/assets/images/post-1.jpg",
      alt: "Warm and welcoming home interior",
    },
    {
      title: "Everyday Furniture Care Tips",
      description:
        "Practical ways to keep your favourite furniture looking its best.",
      image: "/assets/images/post-2.jpg",
      alt: "Modern furniture in a bright living space",
    },
    {
      title: "Smart Furniture Ideas for Small Spaces",
      description:
        "Discover how thoughtful furniture choices can make smaller rooms feel spacious.",
      image: "/assets/images/post-3.jpg",
      alt: "Furniture arranged in a compact interior",
    },
  ];

  return (
    <div className="blog-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6">
            <h2 className="section-title">Furniture Inspiration</h2>
          </div>

          <div className="col-md-6 text-start text-md-end">
            <Link to="/blog" className="more">
              Explore All Articles
            </Link>
          </div>
        </div>

        <div className="row">
          {articles.map((article) => (
            <div
              key={article.title}
              className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0"
            >
              <div className="post-entry">
                <Link to="/blog" className="post-thumbnail">
                  <img
                    src={article.image}
                    alt={article.alt}
                    className="img-fluid"
                  />
                </Link>

                <div className="post-content-entry">
                  <h3>
                    <Link to="/blog">{article.title}</Link>
                  </h3>

                  <p className="mt-2">{article.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}