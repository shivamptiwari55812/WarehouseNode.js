import { useState, useEffect } from 'react';
import  '../../cssfiles/Landing.css';
import { Menu, X, LogIn, Package, BarChart2, Truck, Users, Search, Shield, CheckCircle, MapPin, Phone, Mail} from 'lucide-react';

const Landing = () => {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

useEffect(() => {

const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
const element = card;
element.style.animationDelay = `${index * 0.1}s`;
element.classList.add('animate-fade-in');
});
}, []);


const toggleMobileMenu = () => {
setIsMobileMenuOpen(!isMobileMenuOpen);
};

const handleLogin = () => {
console.log('Navigate to login page');
};

const handleRegister = () => {
console.log('Navigate to register page');
};

return (
<div className="landing-page">
    {/* Header */}
    <header className="header">
        <div className="header-container">
          <div className="header-content">

            {/* Logo + Company Name */}
            <div className="logo-section">
              <div className="logo">TG</div>
              <div className="company-name">
                <span className="total">TOTAL</span> GROUP
              </div>
            </div>

            {/* Nav + Buttons */}
            <div className="desktop-nav">
              <nav className="navigation">
                <ul className="nav-list">
                  <li><a href="#" className="nav-link">Home</a></li>
                  <li><a href="#features" className="nav-link">Features</a></li>
                  <li><a href="#benefits" className="nav-link">Benefits</a></li>
                  <li><a href="#contact-us" className="nav-link">Contact</a></li>
                </ul>

                <div className="nav-buttons">
                  <button onClick={handleLogin} className="login-btn">
                    <LogIn className="btn-icon" />
                    <span>Login</span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Mobile menu-button */}
            <div className="mobile-menu-button">
              <button onClick={toggleMobileMenu} className="menu-toggle">
                {isMobileMenuOpen ? (
                  <X className="menu-icon" />
                ) : (
                  <Menu className="menu-icon" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu animate-fade-in">
              <nav>
                <ul className="mobile-nav-list">
                  <li><a href="#" className="mobile-nav-link">Home</a></li>
                  <li><a href="#features" className="mobile-nav-link">Features</a></li>
                  <li><a href="#benefits" className="mobile-nav-link">Benefits</a></li>
                  <li><a href="#contact" className="mobile-nav-link">Contact</a></li>
                  <li>
                    <button onClick={handleLogin} className="mobile-login-btn">
                      <LogIn className="btn-icon" />
                      <span>Login</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title animate-fade-in">
                <span className="hero-brand">TOTAL GROUP</span>
              </h1>

              <h2 className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Digital Warehouse Management System
              </h2>

              <p className="hero-description animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Transforming manual warehouse operations into streamlined digital processes.
                Optimize inventory, track shipments, and improve efficiency with our advanced solution.
              </p>

              <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <button onClick={handleRegister} className="register-btn">
                  Register
                </button>
              </div>

              <div className="hero-note animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <p>Automating manual processes for better business outcomes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="features-container">
            <div className="features-header">
              <h2 className="features-title">Comprehensive Logistics Solutions</h2>
              <p className="features-description">
                Our warehouse management system offers a complete suite of tools to optimize your logistics operations.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-content">
                  <div className="feature-icon-container">
                    <Package className="feature-icon" />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title">Inventory Management</h3>
                    <p className="feature-description">Real-time tracking and optimized storage allocation for all your inventory needs.</p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-content">
                  <div className="feature-icon-container">
                    <BarChart2 className="feature-icon" />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title">Analytics Dashboard</h3>
                    <p className="feature-description">Comprehensive data visualization and reporting to make informed decisions.</p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-content">
                  <div className="feature-icon-container">
                    <Truck className="feature-icon" />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title">Shipment Tracking</h3>
                    <p className="feature-description">End-to-end visibility of all incoming and outgoing shipments.</p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-content">
                  <div className="feature-icon-container">
                    <Users className="feature-icon" />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title">Staff Management</h3>
                    <p className="feature-description">Optimize workforce scheduling and track productivity metrics.</p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-content">
                  <div className="feature-icon-container">
                    <Search className="feature-icon" />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title">Order Processing</h3>
                    <p className="feature-description">Streamlined picking, packing, and shipping process for faster fulfillment.</p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-content">
                  <div className="feature-icon-container">
                    <Shield className="feature-icon" />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title">Security Protocols</h3>
                    <p className="feature-description">Advanced security features to protect your valuable inventory.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="benefits-section">
          <div className="benefits-container">
            <div className="benefits-content">
              <div className="benefits-image">
                <img 
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Warehouse operations"
                />
              </div>

              <div className="benefits-text">
                <h2 className="benefits-title">
                  Why Choose <span className="benefits-brand">Total Group</span>
                </h2>
                <p className="benefits-description">
                  Our logistics management solutions deliver measurable results that impact your bottom line and improve customer satisfaction.
                </p>

                <ul className="benefits-list">
                  <li className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <span>Reduce operational costs by up to 30%</span>
                  </li>
                  <li className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <span>Improve inventory accuracy by 99.9%</span>
                  </li>
                  <li className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <span>Decrease order fulfillment time by 50%</span>
                  </li>
                  <li className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <span>Minimize picking errors by 80%</span>
                  </li>
                  <li className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <span>Optimize warehouse space utilization</span>
                  </li>
                  <li className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <span>Real-time visibility across all operations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="cta-section">
          <div className="cta-container">
            <div className="cta-card">
              <h2 className="cta-title">
                Ready to Transform Your Warehouse Operations?
              </h2>
              <p className="cta-description">
                Join hundreds of businesses that have optimized their logistics with Total Group's warehouse management solutions.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-about">
              <h3 className="footer-brand">
                <span className="footer-total">TOTAL</span> GROUP
              </h3>
              <p className="footer-description">
                Leading provider of innovative warehouse logistics management solutions that help businesses optimize operations and reduce costs.
              </p>
            </div>

            <div className="footer-links">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Home</a></li>
                <li><a href="#features" className="footer-link">Features</a></li>
                <li><a href="#benefits" className="footer-link">Benefits</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
              </ul>
            </div>

            <div className="footer-solutions">
              <h4 className="footer-heading">Solutions</h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Inventory Management</a></li>
                <li><a href="#" className="footer-link">Order Processing</a></li>
                <li><a href="#" className="footer-link">Shipment Tracking</a></li>
                <li><a href="#" className="footer-link">Warehouse Analytics</a></li>
              </ul>
            </div>

            <div className="footer-contact" id="contact-us">
              <h4 className="footer-heading">Contact Us</h4>
              <ul className="contact-list">
                <li className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>Viraj Impex House, 47 P.D'Mello Road, Mumbai 400 009</span>
                </li>
                <li className="contact-item">
                  <Phone className="contact-icon" />
                  <span>+91 22 40767676</span>
                </li>
                <li className="contact-item">
                  <Mail className="contact-icon" />
                  <span>info@totalgroup.in</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                © 2025 Total Group. All rights reserved.
              </p>
              <div className="footer-legal">
                <a href="#" className="legal-link">Privacy Policy</a>
                <a href="#" className="legal-link">Terms of Service</a>
                <a href="#" className="legal-link">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Landing;