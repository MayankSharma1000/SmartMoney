import "./SettingsSection.css";

function SettingsSection({
  title,
  description,
  children,
}) {
  return (
    <section className="settings-section">

      <div className="settings-header">

        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}

      </div>

      <div className="settings-content">

        {children}

      </div>

    </section>
  );
}

export default SettingsSection;
