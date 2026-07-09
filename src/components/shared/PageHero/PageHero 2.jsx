import "./PageHero.css";

function PageHero({
  title,
  subtitle,
  actions = null,
  children = null,
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-top">
        <div className="page-hero-text">
          <h1>{title}</h1>

          {subtitle && (
            <p>{subtitle}</p>
          )}
        </div>

        {actions && (
          <div className="page-hero-actions">
            {actions}
          </div>
        )}
      </div>

      {children && (
        <div className="page-hero-bottom">
          {children}
        </div>
      )}
    </section>
  );
}

export default PageHero;