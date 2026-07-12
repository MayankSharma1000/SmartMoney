import "./Badge.css";

function Badge({

    children,

    variant = "primary",

    size = "md"

}) {

    return (

        <span
            className={`
                badge
                badge-${variant}
                badge-${size}
            `}
        >

            {children}

        </span>

    );

}

export default Badge;
