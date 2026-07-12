import "./EmptyState.css";

import Button from "@/components/ui/Button";

function EmptyState({

    icon,

    title,

    description,

    actionText,

    onAction

}) {

    return (

        <div className="empty-state">

            {icon && (

                <div className="empty-icon">

                    {icon}

                </div>

            )}

            <h2>

                {title}

            </h2>

            <p>

                {description}

            </p>

            {

                actionText && (

                    <Button
                        onClick={onAction}
                    >

                        {actionText}

                    </Button>

                )

            }

        </div>

    );

}

export default EmptyState;
