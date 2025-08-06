import React from 'react';
import  '../../cssfiles/terms.css';

const TermsOfService = () => {
  return (
    <div className="terms-of-service-container">
      <div className="terms-of-service-wrapper">
        <header className="terms-header">
          <div className="logo-container">
            <div className="logo">TG</div>
            <h1 className="company-name">
              <span className="highlight">TOTAL</span> GROUP
            </h1>
          </div>
          <h1 className="page-title">Terms of Service</h1>
          <p className="last-updated">Last updated: January 2025</p>
        </header>

        <main className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Total Group's warehouse management platform, you accept and agree 
              to be bound by the terms and provision of this agreement. If you do not agree to abide 
              by the above, please do not use this service.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Service Description</h2>
            <p>
              Total Group provides a comprehensive warehouse management platform that includes:
            </p>
            <ul>
              <li>Inventory tracking and management</li>
              <li>Order processing and fulfillment</li>
              <li>Analytics and reporting tools</li>
              <li>Real-time monitoring and alerts</li>
              <li>Integration with third-party systems</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. User Accounts</h2>
            <p>
              To access our services, you must register for an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Promptly updating your account information</li>
              <li>Notifying us of any unauthorized use</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Acceptable Use</h2>
            <p>You agree not to use the service to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Transmit harmful or malicious code</li>
              <li>Interfere with or disrupt the service</li>
              <li>Access unauthorized areas of the system</li>
              <li>Use the service for unlawful purposes</li>
              <li>Reverse engineer or attempt to extract source code</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. Data and Privacy</h2>
            <p>
              Your privacy is important to us. Our data handling practices are governed by our 
              Privacy Policy. By using our services, you consent to the collection and use of 
              information as outlined in our Privacy Policy.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Service Availability</h2>
            <p>
              We strive to maintain high service availability but do not guarantee uninterrupted 
              access. We may temporarily suspend service for maintenance, updates, or due to 
              circumstances beyond our control.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Limitation of Liability</h2>
            <p>
              Total Group shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including but not limited to loss of profits, data, or use, 
              arising out of or related to your use of the service.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and access to the service 
              at our sole discretion, without notice, for conduct that we believe violates these 
              Terms of Service or is harmful to other users or the service.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of 
              material changes via email or through the service. Continued use of the service 
              after such changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="contact-info">
              <p>Email: legal@totalgroup.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Warehouse Street, Business District, City, State 12345</p>
            </div>
          </section>
        </main>

        <footer className="terms-footer">
          <p>&copy; 2025 Total Group. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;