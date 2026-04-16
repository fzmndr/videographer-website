import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { easing } from "../lib/motion";

const navItems = [
  { id: "home", label: "Home" },
  { id: "portfolio", label: "Works" },
  { id: "showreel", label: "Showreel" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ isPreviewOpen = false }) {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    x: 0,
    opacity: 0,
  });

  const [glowStyle, setGlowStyle] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const container = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariant = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: easing,
      },
    },
  };

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) * 0.25;
    const moveY = (y - rect.height / 2) * 0.25;

    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
  };

  const handleNavMouseMove = (e) => {
    if (!navRef.current) return;

    const rect = navRef.current.getBoundingClientRect();

    setGlowStyle({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleNavMouseLeave = () => {
    setGlowStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [location.pathname]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    setHoveredItem(null);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;

      const targetButton =
        navRef.current.querySelector(`button[data-id="${hoveredItem}"]`) ||
        navRef.current.querySelector("button.is-active");

      const navRect = navRef.current.getBoundingClientRect();

      if (targetButton) {
        const rect = targetButton.getBoundingClientRect();

        setIndicatorStyle({
          width: rect.width,
          x: rect.left - navRect.left,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection, location.pathname, hoveredItem]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (menuOpen || isPreviewOpen) {
        setIsHidden(false);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 20) {
        setIsHidden(false);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen, isPreviewOpen]);

  return (
    <header className={`navbar ${isPreviewOpen || isHidden ? "is-hidden" : ""}`}>
      <div className="container navbar__inner">
        <button
          type="button"
          className="navbar__brand logo navbar__brand-btn"
          onClick={() => handleNavClick("home")}
        >
          dikadoki
        </button>

        <nav className="navbar__desktop">
          <ul
            className="nav-links"
            ref={navRef}
            onMouseMove={handleNavMouseMove}
            onMouseLeave={handleNavMouseLeave}
          >
            <span
              className="nav-links__indicator"
              style={{
                width: `${indicatorStyle.width}px`,
                transform: `translateX(${indicatorStyle.x}px)`,
                opacity: indicatorStyle.opacity,
              }}
            />

            <span
              className="nav-links__glow"
              style={{
                transform: `translate(${glowStyle.x}px, ${glowStyle.y}px)`,
                opacity: glowStyle.opacity,
              }}
            />

            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  data-id={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={(e) => {
                    handleMouseLeave(e);
                    setHoveredItem(null);
                  }}
                  className={activeSection === item.id ? "is-active" : ""}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easing }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="mobile-menu__panel"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: easing }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu__header">
                <button
                  type="button"
                  className="mobile-menu__close"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <motion.ul
                className="mobile-menu__list"
                variants={container}
                initial="initial"
                animate="animate"
              >
                {navItems.map((item) => (
                  <motion.li key={item.id} variants={itemVariant}>
                    <button
                      type="button"
                      className={activeSection === item.id ? "is-active" : ""}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}