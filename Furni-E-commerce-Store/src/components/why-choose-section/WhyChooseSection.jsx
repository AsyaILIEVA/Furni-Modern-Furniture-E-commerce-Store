export default function WhyChooseSection() {
  return (
    <div className="why-choose-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <h2 className="section-title">Why Choose Furni?</h2>

            <p>
              We believe great furniture should combine comfort,
              thoughtful design, and everyday practicality. Explore
              pieces that help make your space feel more like home.
            </p>

            <div className="row my-5">
              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/assets/images/truck.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>

                  <h3>Convenient Delivery</h3>

                  <p>
                    Find your favourite pieces and enjoy a simple,
                    convenient shopping experience from home.
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/assets/images/bag.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>

                  <h3>Easy to Explore</h3>

                  <p>
                    Browse our furniture collection and view product
                    details to help you choose the right piece.
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/assets/images/support.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>

                  <h3>Here to Help</h3>

                  <p>
                    Have a question? Get in touch with us through
                    our contact page for assistance.
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/assets/images/return.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>

                  <h3>Shop with Confidence</h3>

                  <p>
                    Review product descriptions and prices before
                    deciding which furniture suits your space.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="img-wrap">
              <img
                src="/assets/images/why-choose-us-img.jpg"
                alt="Modern furniture in a thoughtfully designed interior"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}