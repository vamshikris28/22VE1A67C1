import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import RedirectPage from '../../problem2/RedirectPage.jsx';

const App = () => {
  const [links, setLinks] = useState([]);
  const [longUrl, setLongUrl] = useState('');

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem('links') || '[]');
    setLinks(storedLinks);
  }, []);

  const generateShortCode = () => Math.random().toString(36).substr(2, 5);

  const handleAddLink = () => {
    const code = generateShortCode();
    const newLink = { longUrl, shortCode: code };
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    localStorage.setItem('links', JSON.stringify(updatedLinks));
    setLongUrl('');
  };

  return (
    <Router>
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h1>Simple URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          style={{ width: '70%', marginRight: '10px' }}
        />
        <button onClick={handleAddLink}>Shorten</button>

        <h2 style={{ marginTop: '30px' }}>Shortened Links</h2>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={`/${link.shortCode}`}>{window.location.origin}/{link.shortCode}</a> - {link.longUrl}
            </li>
          ))}
        </ul>

        <Switch>
          <Route path="/:shortCode" component={RedirectPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;