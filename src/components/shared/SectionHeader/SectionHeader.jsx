import "./SectionHeader.css";

function SectionHeader({
    title,
    subtitle,
    actionLabel,
    onAction
}) {

    return (

        <div className="section-header">

            <div>

                <h2>

                    {title}

                </h2>

                {subtitle && (

                    <p>

                        {subtitle}

                    </p>

                )}

            </div>

            {actionLabel && (

                <button
                    className="section-action"
                    onClick={onAction}
                >

                    {actionLabel}

                </button>

            )}

        </div>

    );

}

export default SectionHeader;