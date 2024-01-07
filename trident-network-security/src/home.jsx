import React, { useState } from 'react';
import logo from './Trident.png';

const Home = () => {
  const [captureMessage, setCaptureMessage] = useState('');
  const [isCaptureButtonDisabled, setIsCaptureButtonDisabled] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [showWarning, setShowWarning] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const runPythonScript = async () => {
    try {
      const response = await fetch('http://localhost:3001/run-python-script');
      const data = await response.text();
      
      if (response.status === 200) {
        if(data.toLocaleLowerCase().includes('attack')){
          setShowWarning(true);
        }
        setCaptureMessage(data);
      } else {
        setCaptureMessage(`off scene`);
      }
    } catch (error) {
      setCaptureMessage(`Error running Python script: ${error.message}`);
    }
  };

  const handleCaptureClick = async () => {
    setIsButtonPressed(true);
    setIsCaptureButtonDisabled(true);
    setCaptureMessage('Wireshark capture in progress......');
    setTimerSeconds(60);

    try {
      const response = await fetch('http://localhost:3001/start-wireshark');
      if (response.ok) {
        const timerInterval = setInterval(() => {
          setTimerSeconds(prevSeconds => {
            if (prevSeconds <= 1) {
              clearInterval(timerInterval);
              setCaptureMessage('pcap transformation and analysis in progress....');
              runPythonScript();
              return 0;
            }
            return prevSeconds - 1;
          });
        }, 1000);
      } else {
        setCaptureMessage(`Error starting Wireshark capture: ${response.statusText}`);
        setIsCaptureButtonDisabled(false);
      }
    } catch (error) {
      setCaptureMessage(`Error: ${error.message}`);
      setIsCaptureButtonDisabled(false);
    }
  };

  return (
    <div className="home-page">
      <div className="logo-container">
        <img src={logo} alt="Trident Security Logo" className="logo" />
      </div>
      <h1 className="header-title">TRIDENT</h1>
      <p className="full-form">Threat Recognition and Intelligent Defense in IoT Networks</p>
      <button onClick={handleCaptureClick} className="capture-button" disabled={isCaptureButtonDisabled}>
        Start Capturing
      </button>
      <div className="info-container">
      <div className="capture-message">{captureMessage}</div>
      {isButtonPressed && timerSeconds > 0 && (
        <div className="timer">{timerSeconds} seconds remaining</div>
      )}
      {showWarning && <div className="warning-prompt">Bad Traffic Detected</div>}
    </div>
    </div>
  );
};

export default Home;
