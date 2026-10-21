import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function Header({ cartCount }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    setUserMenuOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setUserMenuOpen(false);
  }

  return (
    <nav
      className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark"
      aria-label="Furni navigation bar"
    >
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          Furni<span>.</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsFurni"
          aria-controls="navbarsFurni"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                end
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/shop"
                onClick={closeMenu}
              >
                Shop
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/blog"
                onClick={closeMenu}
              >
                Inspiration
              </NavLink>
            </li>
          </ul>

          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-md-4">
            <li className="nav-item user-menu-wrapper">
              <button
                type="button"
                className="nav-link user-menu-button"
                aria-label="Open user menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((open) => !open)}
              >
                <img src="/assets/images/user.svg" alt="" />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  {!loading && !user && (
                    <>
                      <Link
                        to="/login"
                        className="user-dropdown-link"
                        onClick={closeMenu}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="user-dropdown-link"
                        onClick={closeMenu}
                      >
                        Register
                      </Link>
                    </>
                  )}

                  {!loading && user && (
                    <>
                      <Link to="/products/create" 
                      className="user-dropdown-link" onClick={closeMenu}>
                        Add Product
                      </Link>
                      <button
                        type="button"
                        className="user-dropdown-link user-dropdown-action"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  )}

                  {loading && (
                    <span className="user-dropdown-link">
                      Loading...
                    </span>
                  )}
                </div>
              )}
            </li>

            <li className="nav-item">
              <Link className="nav-link cart-link" to="/cart">
                <img src="/assets/images/cart.svg" alt="Shopping cart" />
                <span className="ms-1">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}