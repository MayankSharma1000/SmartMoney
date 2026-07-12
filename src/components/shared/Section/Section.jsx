import "./Section.css";

function Section({

    title,

    subtitle,

    action,

    children

}) {

    return (

        <section className="section">

            {

                (title || subtitle || action) && (

                    <div className="section-header">

                        <div>

                            {

                                title &&

                                <h2>

                                    {title}

                                </h2>

                            }

                            {

                                subtitle &&

                                <p>

                                    {subtitle}

                                </p>

                            }

                        </div>

                        {

                            action &&

                            <div>

                                {action}

                            </div>

                        }

                    </div>

                )

            }

            <div className="section-body">

                {children}

            </div>

        </section>

    );

}

export default Section;
