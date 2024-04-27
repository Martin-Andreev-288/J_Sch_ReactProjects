import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";
// tuk experimentirame. Ideqta e da vidim, che dori da ima elementi, koito da zapochvat po edin i syshti nachin
// (v sluchaq - s nav), imat klasove s razlichni imena i se razlichavat, t.e. ne se sluchva koliziq.
function Homepage() {
    return (
        <div>
            <PageNav />
            <AppNav />
            <h1 className="test">WorldWise</h1>
            {/* <a href="/pricing">Pricing</a> taka stranicata shte se prezarezhda, a ne iskame tova
            Tova mozhe da se proveri v Network -> All
            Zatova izpolzvame Link: */}

            <Link to="/app">Go to the app</Link>
        </div>
    );
}

export default Homepage;