
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container">
                <p className="mb-1">🌿 ЕкоТишина</p>
                <p className="mb-0">Заедно за един по-тих и здравословен свят!</p>
            </div>
            <div>
                <Link className="nav-link text-dark" to="/privacy">
                    Privacy
                </Link>
                Contacts:
                <br />
                Цветомир Смилов: +359 89 430 2833
                <br />
                Стойчо Георгиев: +359 89 565 0627
            </div>
        </footer>
    )
}

export default Footer;
