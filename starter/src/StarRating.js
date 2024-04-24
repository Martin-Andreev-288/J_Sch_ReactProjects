const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const starContainerSyle = {
    display: "flex",
    gap: "4px",
};

const textStyle = {
    lineHeight: "1",
    margin: "0",
};

/* ako v index.js imame samo <StarRating />, bez nishto podadeno, shte se poluchi problem, zatova e po-dobre
da napishem maxRating = 5 kato argument, vmesto samo maxRating, kakto beshe v po-golqmata chast ot videoto */
export default function StarRating({ maxRating = 5 }) {
    return (
        <div style={containerStyle}>
            <div style={starContainerSyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <span>S{i + 1}</span>
                ))}
            </div>
            <p style={textStyle}>10</p>
        </div>
    );
}

// tr da ima key v array from-a, no ponezhe e vremenno, ne si pravim truda da go dobavqme tuk