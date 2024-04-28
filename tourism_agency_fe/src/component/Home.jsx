import React from "react";
import ClientNavbar from './ClientNavbar';
import LocationBar from './LocationBar';

const Home = () => {
    return (
        <>
            <ClientNavbar />
            <div className="home-container">
                <div className="logo-container">
                    <img className="logo" src="./logo.png" alt="Logo"/>
                </div>
                <div className="description-container">
                    <div className="text-container">
                    <h3 style={{ color: "#6C757D" }}>Ai pleca la Roma sau Paris?</h3>
                        <p>
                            Sau la Milano ca sa-ti faci viata un vis? <br />
                            RPM Travel are solutia pentru tine! <br />
                            Zeci de oferte atractive sunt doar la un click distanta. <br />
                            Rezerva-ti acum vacanta de vis!
                        </p>
                    </div>
                </div>
            </div>
            <LocationBar />
        </>
    )
}

export default Home;
