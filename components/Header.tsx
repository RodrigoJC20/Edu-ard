import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.mainheader}>
            <div className={styles.ej}>
                <div className={styles.ej2}>
                    <img className={styles.logo} src="/logo.svg" alt="" />
                    <img className={styles.logo2} src="/Edu-ard.svg" alt="" />
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:underline">Log out</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
