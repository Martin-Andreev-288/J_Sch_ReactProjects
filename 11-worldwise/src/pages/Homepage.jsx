import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

function Homepage() {
    return (
        <div>
            <PageNav />
            <h1>WorldWise</h1>
            {/* <a href="/pricing">Pricing</a> taka stranicata shte se prezarezhda, a ne iskame tova
            Tova mozhe da se proveri v Network -> All
            Zatova izpolzvame Link: */}

            <Link to="/pricing">Pricing</Link>
        </div>
    );
}

export default Homepage;