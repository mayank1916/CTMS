import React from "react";
import { Link } from "react-router-dom";

import {
  Activity,
  ArrowRight,
  ShieldCheck,
  Users,
  ClipboardCheck,
  HeartPulse,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";

import "../../styles/Landing/landingPage.css";

function LandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="landing-page">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header className="landing-nav-wrapper">
        <nav className="landing-nav">

          {/* Logo */}
          <Link
            to="/"
            className="landing-logo"
            onClick={closeMenu}
          >
            <div className="landing-logo-mark">
              <Activity size={28} strokeWidth={1.8} />
            </div>

            <div className="landing-logo-text">
              <span className="landing-logo-name">
                NIDAN
              </span>

              <span className="landing-logo-subtitle">
                CLINICAL RESEARCH
              </span>
            </div>
          </Link>


          {/* Desktop Navigation */}
          <div className="landing-nav-links">

            <a href="#services">
              Services
            </a>

            <a href="#ecosystem">
              Engage
            </a>

            <a href="#about">
              About Us
            </a>

          </div>


          {/* Start Your Journey */}
          <Link
            to="/login"
            className="landing-start-btn"
          >
            START YOUR JOURNEY
            <ArrowRight size={17} />
          </Link>


          {/* Mobile Menu Button */}
          <button
            className="landing-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>

        </nav>


        {/* Mobile Navigation */}
        <div
          className={`landing-mobile-menu ${
            menuOpen
              ? "landing-mobile-menu-open"
              : ""
          }`}
        >

          <a
            href="#services"
            onClick={closeMenu}
          >
            Services
          </a>

          <a
            href="#ecosystem"
            onClick={closeMenu}
          >
            Engage
          </a>

          <a
            href="#about"
            onClick={closeMenu}
          >
            About Us
          </a>

          <Link
            to="/login"
            onClick={closeMenu}
          >
            START YOUR JOURNEY
            <ArrowRight size={16} />
          </Link>

        </div>
      </header>


      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <main>

        <section className="landing-hero">

          {/* Hero Label */}
          <div className="landing-hero-label">

            <span></span>

            CONNECTED CLINICAL RESEARCH

            <span></span>

          </div>


          {/* Hero Heading */}
          <h1 className="landing-hero-title">

            CONNECT.
            <br />

            <em>MANAGE.</em>
            <br />

            ADVANCE.

          </h1>


          {/* Description */}
          <p className="landing-hero-description">

            A unified clinical trial management platform
            bringing researchers, coordinators, ethics
            committees and safety teams together in one
            connected ecosystem.

          </p>


          {/* Hero Buttons */}
          <div className="landing-hero-actions">

            <Link
              to="/login"
              className="landing-primary-btn"
            >
              Enter NIDAN
              <ArrowRight size={18} />
            </Link>


            <a
              href="#about"
              className="landing-secondary-btn"
            >
              Discover NIDAN
            </a>

          </div>


          {/* =================================================
              HERO ARTWORK
          ================================================= */}

          <div className="landing-artwork">

            {/* Clinical Illustration */}
            <div className="landing-clinical-card">

              <div className="landing-clinical-arch">

                {/* Document */}
                <div className="landing-document">

                  <div className="document-clip"></div>

                  <div className="document-line document-line-long"></div>

                  <div className="document-line"></div>


                  <div className="document-check-row">

                    <CheckCircle2 size={17} />

                    <span></span>

                  </div>


                  <div className="document-check-row">

                    <CheckCircle2 size={17} />

                    <span></span>

                  </div>


                  <div className="document-check-row">

                    <CheckCircle2 size={17} />

                    <span></span>

                  </div>

                </div>


                {/* Shield */}
                <div className="landing-shield">

                  <ShieldCheck
                    size={32}
                    strokeWidth={1.6}
                  />

                </div>


                {/* Data Cloud */}
                <div className="landing-data-cloud">

                  <div className="cloud-top"></div>

                  <div className="cloud-body">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                </div>


                {/* Connection Dots */}
                <div className="connection-dot connection-one"></div>

                <div className="connection-dot connection-two"></div>

                <div className="connection-dot connection-three"></div>

              </div>


              {/* Progress */}
              <div className="landing-progress">

                <span></span>

              </div>


              <div className="landing-art-label">

                <span>
                  STUDY
                </span>

                <strong>
                  CONNECTED
                </strong>

              </div>

            </div>


            {/* Botanical Illustration */}
            <div className="landing-botanical">

              <svg
                viewBox="0 0 900 520"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >

                {/* Main branches */}

                <path
                  d="M80 500 C180 430 230 390 320 330 C420 265 510 275 610 210 C690 160 755 130 870 50"
                  className="branch-main"
                />

                <path
                  d="M220 420 C300 370 350 320 365 220 C375 160 390 105 430 55"
                  className="branch-line"
                />

                <path
                  d="M355 340 C430 320 470 270 500 185 C520 130 555 95 585 70"
                  className="branch-line"
                />

                <path
                  d="M520 275 C600 270 660 225 685 155 C700 115 735 80 770 58"
                  className="branch-line"
                />

                <path
                  d="M625 215 C710 225 770 190 815 125"
                  className="branch-line"
                />


                {/* Leaves */}

                <g className="botanical-leaves">

                  <ellipse
                    cx="310"
                    cy="328"
                    rx="10"
                    ry="30"
                    transform="rotate(-55 310 328)"
                  />

                  <ellipse
                    cx="325"
                    cy="310"
                    rx="9"
                    ry="28"
                    transform="rotate(35 325 310)"
                  />

                  <ellipse
                    cx="340"
                    cy="285"
                    rx="10"
                    ry="30"
                    transform="rotate(-45 340 285)"
                  />

                  <ellipse
                    cx="355"
                    cy="263"
                    rx="9"
                    ry="27"
                    transform="rotate(35 355 263)"
                  />


                  <ellipse
                    cx="390"
                    cy="320"
                    rx="10"
                    ry="30"
                    transform="rotate(-60 390 320)"
                  />

                  <ellipse
                    cx="415"
                    cy="303"
                    rx="10"
                    ry="29"
                    transform="rotate(40 415 303)"
                  />

                  <ellipse
                    cx="430"
                    cy="277"
                    rx="9"
                    ry="27"
                    transform="rotate(-45 430 277)"
                  />

                  <ellipse
                    cx="445"
                    cy="250"
                    rx="10"
                    ry="29"
                    transform="rotate(35 445 250)"
                  />


                  <ellipse
                    cx="480"
                    cy="280"
                    rx="10"
                    ry="30"
                    transform="rotate(-50 480 280)"
                  />

                  <ellipse
                    cx="505"
                    cy="260"
                    rx="9"
                    ry="27"
                    transform="rotate(40 505 260)"
                  />

                  <ellipse
                    cx="520"
                    cy="230"
                    rx="10"
                    ry="30"
                    transform="rotate(-45 520 230)"
                  />

                  <ellipse
                    cx="540"
                    cy="205"
                    rx="9"
                    ry="28"
                    transform="rotate(35 540 205)"
                  />


                  <ellipse
                    cx="585"
                    cy="245"
                    rx="10"
                    ry="30"
                    transform="rotate(-50 585 245)"
                  />

                  <ellipse
                    cx="610"
                    cy="225"
                    rx="9"
                    ry="27"
                    transform="rotate(40 610 225)"
                  />

                  <ellipse
                    cx="625"
                    cy="195"
                    rx="10"
                    ry="29"
                    transform="rotate(-45 625 195)"
                  />

                  <ellipse
                    cx="645"
                    cy="170"
                    rx="9"
                    ry="27"
                    transform="rotate(35 645 170)"
                  />


                  <ellipse
                    cx="690"
                    cy="210"
                    rx="10"
                    ry="29"
                    transform="rotate(-50 690 210)"
                  />

                  <ellipse
                    cx="715"
                    cy="190"
                    rx="9"
                    ry="27"
                    transform="rotate(40 715 190)"
                  />

                  <ellipse
                    cx="735"
                    cy="160"
                    rx="10"
                    ry="29"
                    transform="rotate(-45 735 160)"
                  />

                  <ellipse
                    cx="755"
                    cy="135"
                    rx="9"
                    ry="26"
                    transform="rotate(35 755 135)"
                  />


                  {/* Upper branch */}

                  <ellipse
                    cx="365"
                    cy="205"
                    rx="9"
                    ry="27"
                    transform="rotate(-50 365 205)"
                  />

                  <ellipse
                    cx="385"
                    cy="185"
                    rx="9"
                    ry="26"
                    transform="rotate(40 385 185)"
                  />

                  <ellipse
                    cx="400"
                    cy="150"
                    rx="10"
                    ry="29"
                    transform="rotate(-45 400 150)"
                  />

                  <ellipse
                    cx="415"
                    cy="125"
                    rx="9"
                    ry="26"
                    transform="rotate(35 415 125)"
                  />

                  <ellipse
                    cx="430"
                    cy="95"
                    rx="9"
                    ry="25"
                    transform="rotate(-35 430 95)"
                  />


                  {/* Far right */}

                  <ellipse
                    cx="790"
                    cy="190"
                    rx="9"
                    ry="27"
                    transform="rotate(-55 790 190)"
                  />

                  <ellipse
                    cx="815"
                    cy="165"
                    rx="9"
                    ry="26"
                    transform="rotate(35 815 165)"
                  />

                  <ellipse
                    cx="835"
                    cy="130"
                    rx="9"
                    ry="27"
                    transform="rotate(-40 835 130)"
                  />

                  <ellipse
                    cx="855"
                    cy="105"
                    rx="8"
                    ry="24"
                    transform="rotate(35 855 105)"
                  />

                </g>

              </svg>

            </div>


            {/* Artwork Caption */}

            <div className="landing-art-caption">

              <span>
                Harmonizing research
              </span>

              <strong>
                with clarity.
              </strong>

            </div>

          </div>

        </section>


        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          id="about"
          className="landing-about"
        >

          <div className="landing-section-heading">

            <span className="section-eyebrow">
              ABOUT NIDAN
            </span>

            <h2>
              One connected space
              <br />
              <em>
                for clinical research.
              </em>
            </h2>

          </div>


          <div className="landing-about-content">

            <p className="landing-about-large">

              NIDAN brings the complete clinical trial
              ecosystem together — from study planning
              and participant management to ethics review
              and pharmacovigilance.

            </p>


            <p className="landing-about-small">

              Instead of managing disconnected workflows,
              teams can work from one structured platform
              where information, responsibilities and
              progress remain connected.

            </p>

          </div>

        </section>


        {/* =================================================
            SERVICES / ACTORS
        ================================================= */}

        <section
          id="services"
          className="landing-services"
        >

          <div className="landing-services-header">

            <div>

              <span className="section-eyebrow">
                OUR SERVICES
              </span>

              <h2>
                Built around the
                <br />
                <em>
                  research journey.
                </em>
              </h2>

            </div>


            <p>

              Every part of a clinical trial deserves
              clarity, accountability and secure
              collaboration.

            </p>

          </div>


          {/* =================================================
              FOUR ACTOR CARDS
          ================================================= */}

          <div className="landing-service-grid">


            {/* ===============================================
                01 — STUDY COORDINATOR
            =============================================== */}

            <div className="landing-service-card">

              <div className="service-icon">

                <ClipboardCheck size={26} />

              </div>


              <span>
                01
              </span>


              <h3>
                Study Coordinator
              </h3>


              <p>

                Coordinate study operations, visits,
                participants, tasks, documents and
                day-to-day clinical trial activities.

              </p>


              {/* CLICKABLE ARROW */}

              <Link
                to="/study-coordinator"
                className="service-arrow"
                aria-label="Open Study Coordinator"
              >
                <ArrowRight size={21} />
              </Link>

            </div>


            {/* ===============================================
                02 — PRINCIPAL INVESTIGATOR
            =============================================== */}

            <div className="landing-service-card">

              <div className="service-icon">

                <Users size={26} />

              </div>


              <span>
                02
              </span>


              <h3>
                Principal Investigator
              </h3>


              <p>

                Lead clinical studies, oversee participants,
                monitor milestones, review safety and
                manage research progress.

              </p>


              {/* CLICKABLE ARROW */}

              <Link
                to="/investigator"
                className="service-arrow"
                aria-label="Open Principal Investigator"
              >
                <ArrowRight size={21} />
              </Link>

            </div>


            {/* ===============================================
                03 — ETHICS COMMITTEE
            =============================================== */}

            <div className="landing-service-card">

              <div className="service-icon">

                <ShieldCheck size={26} />

              </div>


              <span>
                03
              </span>


              <h3>
                Ethics Committee
              </h3>


              <p>

                Review clinical trial submissions,
                protocols, documents, meetings and
                ethical compliance requirements.

              </p>


              {/* CLICKABLE ARROW */}

              <Link
                to="/ethics-committee"
                className="service-arrow"
                aria-label="Open Ethics Committee"
              >
                <ArrowRight size={21} />
              </Link>

            </div>


            {/* ===============================================
                04 — PHARMACOVIGILANCE
            =============================================== */}

            <div className="landing-service-card">

              <div className="service-icon">

                <HeartPulse size={26} />

              </div>


              <span>
                04
              </span>


              <h3>
                Pharmacovigilance
              </h3>


              <p>

                Manage safety cases, coding, signals,
                follow-ups and regulatory reporting
                throughout the clinical trial lifecycle.

              </p>


              {/* CLICKABLE ARROW */}

              <Link
                to="/pharmacovigilance"
                className="service-arrow"
                aria-label="Open Pharmacovigilance"
              >
                <ArrowRight size={21} />
              </Link>

            </div>

          </div>

        </section>


        {/* =================================================
            ECOSYSTEM
        ================================================= */}

        <section
          id="ecosystem"
          className="landing-ecosystem"
        >

          <div className="ecosystem-copy">

            <span className="section-eyebrow">
              THE NIDAN ECOSYSTEM
            </span>


            <h2>

              Different roles.
              <br />

              <em>
                One direction.
              </em>

            </h2>


            <p>

              NIDAN connects the people responsible for
              moving a clinical study forward while giving
              each role the tools and visibility they need.

            </p>


            <Link
              to="/login"
              className="ecosystem-btn"
            >

              Explore NIDAN

              <ArrowRight size={18} />

            </Link>

          </div>


          {/* Ecosystem Visual */}

          <div className="ecosystem-roles">


            {/* Investigator */}

            <Link
              to="/investigator"
              className="ecosystem-role ecosystem-role-one"
            >

              <span>
                01
              </span>

              <strong>
                Principal Investigator
              </strong>

              <small>
                Leads the study
              </small>

            </Link>


            {/* Coordinator */}

            <Link
              to="/study-coordinator"
              className="ecosystem-role ecosystem-role-two"
            >

              <span>
                02
              </span>

              <strong>
                Study Coordinator
              </strong>

              <small>
                Coordinates operations
              </small>

            </Link>


            {/* Ethics */}

            <Link
              to="/ethics-committee"
              className="ecosystem-role ecosystem-role-three"
            >

              <span>
                03
              </span>

              <strong>
                Ethics Committee
              </strong>

              <small>
                Reviews & protects
              </small>

            </Link>


            {/* Pharmacovigilance */}

            <Link
              to="/pharmacovigilance"
              className="ecosystem-role ecosystem-role-four"
            >

              <span>
                04
              </span>

              <strong>
                Pharmacovigilance
              </strong>

              <small>
                Monitors safety
              </small>

            </Link>


            {/* Center */}

            <div className="ecosystem-center">

              <div>

                <Activity size={30} />

              </div>


              <strong>
                NIDAN
              </strong>


              <span>
                CONNECTED
                <br />
                RESEARCH
              </span>

            </div>

          </div>

        </section>


        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="landing-final-cta">

          <div className="cta-decoration cta-decoration-left"></div>

          <div className="cta-decoration cta-decoration-right"></div>


          <span className="section-eyebrow">
            BEGIN WITH CLARITY
          </span>


          <h2>

            Research moves better
            <br />

            <em>
              when everything connects.
            </em>

          </h2>


          <p>

            Step into a more connected clinical research
            experience with NIDAN.

          </p>


          <Link
            to="/login"
            className="landing-cta-button"
          >

            START YOUR JOURNEY

            <ArrowRight size={18} />

          </Link>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="landing-footer">

        <div className="landing-footer-brand">

          <div className="landing-logo-mark">

            <Activity
              size={25}
              strokeWidth={1.8}
            />

          </div>


          <div>

            <strong>
              NIDAN
            </strong>

            <span>
              CLINICAL RESEARCH
            </span>

          </div>

        </div>


        <p>
          Harmonizing clinical research with clarity.
        </p>


        <span className="landing-footer-copy">

          © 2026 NIDAN. Clinical Trial Management System.

        </span>

      </footer>

    </div>
  );
}

export default LandingPage;  