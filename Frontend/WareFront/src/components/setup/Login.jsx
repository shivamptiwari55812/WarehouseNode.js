import { useState } from 'react';
import styles from '../../cssfiles/Login.module.css';
import { Mail, Lock, ArrowRight, Heart, CheckCircle, TrendingUp, Smartphone } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Login attempt:', { email, password, remember });

    
    setTimeout(() => {
      setLoading(false);
      setStatus('Login successful!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputContainer}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <Mail size={18} className={styles.icon} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputContainer}>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <Lock size={18} className={styles.icon} />
            </div>
          </div>

          <div className={styles.optionsRow}>
            <div className={styles.rememberMe}>
              <input 
                type="checkbox" 
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className={styles.forgotPassword}>Forgot password?</Link>
          </div>

          {status && <p className={styles.status}>{status}</p>}

          <button type="submit" disabled={loading} className={styles.loginButton}>
            {loading ? 'Logging in...' : <>
              <span>Login</span>
              <ArrowRight className={styles.arrowIcon} size={24} />
            </>}
          </button>

          <p className={styles.signupText}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>

      <div className={styles.infoPanel}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <div className={styles.infoCard}>
            <h2>Warehouse Logistics Management</h2>
            <p>Optimize inventory, streamline operations, and boost productivity with our powerful platform.</p>

            <div className={styles.benefitsContainer}>
              <div className={styles.benefitItem}>
                <Heart size={18} /> <span>Real-time inventory tracking</span>
              </div>
              <div className={styles.benefitItem}>
                <CheckCircle size={18} /> <span>Automated order processing</span>
              </div>
              <div className={styles.benefitItem}>
                <TrendingUp size={18} /> <span>Analytics and reporting</span>
              </div>
              <div className={styles.benefitItem}>
                <Smartphone size={18} /> <span>Mobile accessibility</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
