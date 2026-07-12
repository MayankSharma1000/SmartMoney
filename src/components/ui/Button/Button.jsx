import { motion } from "framer-motion";
import "./Button.css";

function Button({

    children,

    variant = "primary",

    size = "md",

    icon,

    fullWidth = false,

    onClick,

    type = "button",

    disabled = false

}) {

    return (

        <motion.button

            whileTap={{ scale: .97 }}

            whileHover={
                !disabled
                    ? { y: -2 }
                    : {}
            }

            type={type}

            disabled={disabled}

            onClick={onClick}

            className={`
                btn
                btn-${variant}
                btn-${size}
                ${fullWidth ? "btn-full" : ""}
            `}

        >

            {icon &&

                <span className="btn-icon">

                    {icon}

                </span>

            }

            <span>

                {children}

            </span>

        </motion.button>

    );

}

export default Button;
