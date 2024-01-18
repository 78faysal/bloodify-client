import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
            <h2 className="text-3xl font-bold">🩸Bloodify</h2>
          <p className="pl-3">
            Blood Donation
            <br />
            Donating since 2010
          </p>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <Link to={'/donor-search'} className="link link-hover">Get Blood</Link>
          <Link to={'/donation-requests'} className="link link-hover">Donate Blood</Link>
          <Link to={'/blogs'} className="link link-hover">Blogs</Link>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <Link to={''} className="link link-hover">About us</Link>
          <Link to={'/'} className="link link-hover">Contact Us</Link>
          <Link to={''} className="link link-hover">Jobs</Link>
          <Link to={''} className="link link-hover">Press kit</Link>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <Link to={''} className="link link-hover">Terms of use</Link>
          <Link to={''} className="link link-hover">Privacy policy</Link>
          <Link to={''} className="link link-hover">Cookie policy</Link>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
