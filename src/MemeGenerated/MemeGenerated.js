import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";

export const MemeGenerated = ({dark}) => {

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
    <section className={dark ? "bg-dark" : "bg-light"}  style={{height:"100vh"}}>
    <div className="p-4 container ">
      <div className=' d-flex justify-content-center'>
        <button onClick={() => history('/') } className={dark ? "btn btn-outline-warning col-lg-4 m-2" : "btn btn-warning col-lg-4 m-2"}>Back</button>
        <button onClick={copyLink} className={dark ? "btn btn-outline-primary col-lg-4 m-2" : "btn btn-primary col-lg-4 m-2"}>{copied ? 'Link Copied!' : 'Copy Link'}</button>
      </div>
      <div>{url && <img src={url} alt="meme" className="img-fluid" />}</div>
    </div>
    </section>
  );
}
