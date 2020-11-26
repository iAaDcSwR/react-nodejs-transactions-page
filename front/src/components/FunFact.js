import './FunFact.css';
import NumberFormat from 'react-number-format';

/**
 * @param {{color: string; lineAwesomeClassName: string; label: string; result: number; isPercentage: boolean;}} props
 */
function FunFact(props) {
    return (
        <article className={"fun-fact " + props.color}>
            <section className="icon-container">
                <i className={"las " + props.lineAwesomeClassName} />
                <img className="glow" src="button-glow.svg" alt="" />
            </section>
            <section className="content">
                <span className="bullet">•</span>
                <span className="label">{props.label}</span><br />
                <span className="result">
                    <NumberFormat
                        value={props.result * (props.isPercentage ? 100 : 1)}
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={value => value + (props.isPercentage ? "%" : "")}
                    />
                </span>
            </section>
        </article>
    );
}

export default FunFact;
