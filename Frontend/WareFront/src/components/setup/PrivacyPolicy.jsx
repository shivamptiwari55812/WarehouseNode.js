import React from 'react';
import  '../../cssfiles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-wrapper">
        <header className="policy-header">
          <div className="logo-container">
            <div className="logo">TG</div>
            <h1 className="company-name">
              <span className="highlight">TOTAL</span> GROUP
            </h1>
          </div>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="last-updated">Last updated: January 2025</p>
        </header>

        <main className="policy-content">
          <section className="policy-section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              use our warehouse management services, or contact us for support.
            </p>
            <ul>
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Business information (company name, address, warehouse details)</li>
              <li>Usage data and analytics</li>
              <li>Communication records</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our warehouse management services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy:
            </p>
            <ul>
              <li>With service providers who assist in our operations</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>In connection with a business transfer</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. This includes encryption, 
              secure servers, and regular security audits.
            </p>
          </section>

          <section className="policy-section">
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Restrict processing of your information</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, 
              analyze usage patterns, and improve our services. You can control cookie 
              settings through your browser preferences.
            </p>
          </section>

          <section className="policy-section">
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="contact-info">
              <p>Email: info@totalgroup.in</p>
              <p>Phone: +91 22 40767676</p>
              <p>Address: Viraj Impex House, 47 P.D'Mello Road, Mumbai 400 009</p>
            </div>
          </section>
        </main>

        <footer className="policy-footer">
          <p>&copy; 2025 Total Group. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;