import "./PageHero.css";

function PageHero({
  title,
  subtitle,
  actions,
  children,
}) {
  return (
    <section className="page-hero">

      <div className="page-hero__content">

        <div className="page-hero__text">

          <h1>{title}</h1>

          {subtitle && (
            <p>{subtitle}</p>
          )}

        </div>

        {actions && (
          <div className="page-hero__actions">
            {actions}
          </div>
        )}

      </div>

      {children && (
        <div className="page-hero__bottom">
          {children}
        </div>
      )}

    </section>
  );
}

export default PageHero;