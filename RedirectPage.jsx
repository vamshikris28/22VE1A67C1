import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedirectPage = () => {
  const { shortCode = '' } = useParams();
  let links = [];
  try {
    links = JSON.parse(localStorage.getItem('links') || '[]');
    if (!Array.isArray(links)) links = [];
  } catch (e) {
    links = [];
  }
  const link = links.find((l) => l.shortCode === shortCode);

  useEffect(() => {
    if (link) {
      window.location.href = link.longUrl;
    }
  }, [link]);

  if (!link) {
    return <h3>Invalid or expired link</h3>;
  }
  return null;
};

export default RedirectPage;