/** @format */

import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { Search } from "components/Search";

function Navbar() {
	return (
		<nav className={styles.container}>
			<Link to='/'>
				<h1 className={styles.title}>Etkinliğini Bul</h1>
			</Link>
			<section className={styles.links}>
				<Search />
				<Link className={styles.link} to='/konser'>
					Konser
				</Link>
				<Link className={styles.link} to='/tiyatro'>
					Tiyatro
				</Link>
				<Link className={styles.link} to='/festival'>
					Festival
				</Link>
			</section>
		</nav>
	);
}

export default Navbar;
