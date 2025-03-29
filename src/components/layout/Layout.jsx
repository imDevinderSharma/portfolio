import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import { useTheme } from '../../hooks/useTheme';

const Layout = ({ children }) => {
  const { theme } = useTheme();
  
  // Apply theme to body element
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout; 