import "./IconBox.css";

function IconBox({

    children,

    color = "primary",

    size = "md"

}) {

    return (

        <div
            className={`icon-box icon-${color} icon-${size}`}
        >

            {children}

        </div>

    );

}

export default IconBox;
