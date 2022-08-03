import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";
import styles from './styles.module.css';
export const MemeGenerated = () => {

  const [copied,setCopied] = useState(false);

  const clipboard = useClipboard();
  const history = useNavigate();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  }

  return (
    <div className={styles.container}>
      <button onClick={() => history('/') } className={styles.home}>Back</button>
      <button onClick={copyLink} className={styles.copy}>{copied ? 'Link Copied!' : 'Copy Link'}</button>
      {url && <img src={url} alt="meme"/>}
    </div>
  );
}
