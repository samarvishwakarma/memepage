import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import image from "../happy.png"; 

export const Meme = ({dark, setDark}) => {

    const [memes, setMemes] = useState([]);
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);


    const history = useNavigate();

    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };
    
    const generateMeme = () => {
        const currentMeme = memes[memeIndex];
        const formData = new FormData();

        formData.append('username', 'weareindian69');
        formData.append('password', '123four5678');
        formData.append('template_id',currentMeme.id);
        captions.forEach((c,index) => formData.append(`boxes[${index}][text]`, c));

        fetch('https://api.imgflip.com/caption_image',{
            method: 'POST',
            body: formData
        }).then(res => {
            res.json().then(res => {
                history(`/generated?url=${res.data.url}`);
            });
        });
    };

    const updateCaption = (e,index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((c, i)=> {
                if(index === i){
                    return text;
                }
                else
                {
                    return c;
                }
            })
        )
    }

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(res => {
            res.json().then(res => {
                const _memes = res.data.memes;
                shuffleMemes(_memes);
                setMemes(_memes);
            });
        });
            
    }, []);

    useEffect(() => {
        if(memes.length){
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }

    },[memeIndex, memes]);

    return (
        <div className={dark ? "bg-dark" : "bg-light"} style={dark? { backgroundImage:`url(${image})`, backgroundRepeat:"repeat-y", backgroundSize:"100%", } : {}}>
        <div className="d-flex justify-content-center pt-2"><button type="button" className={dark ? "btn btn-sm btn-dark" : "btn btn-sm btn-light"} style={{border:"none", alignItems:"start"}} 
            onClick={() => setDark(!dark)}>{dark ? <i className="bi bi-lightbulb"></i> : <i className="bi bi-lightbulb-fill"></i>}</button> </div>
        <div className="pd-4 text-center"><h1 className={dark ? "text-light" : "text-dark"}>SAMEMEPAGE</h1></div>       
            {memes.length ? <div className='container'>
                <div className='d-flex justify-content-center mt-3'>
                {memeIndex===0 ? <div></div> : <button onClick={() => setMemeIndex(memeIndex - 1)} className={dark ? "btn btn-outline-danger m-2" : "btn btn-danger m-2"}>Previous</button>  }
                    <button onClick={() => setMemeIndex(memeIndex + 1)} className={dark ? "btn btn-outline-warning m-2" : "btn btn-warning m-2"}>Next</button>
                    
                </div>
                <div className='row align-items-center mt-5 mb-5' >
                    <img src={memes[memeIndex].url} alt={memes[memeIndex].name} className="img col-lg-4 p-1 mb-5" />
                    <div className='col-lg-4 d-flex flex-column justify-content-center align-items-center'>
                    {
                        captions.map((c, index) => (
                            <input className={dark ? "form-control bg-dark m-2" : "form-control bg-light m-2"} style={dark ? {color:"white"} : {color:"black"}} onChange={(e) => updateCaption(e, index)} key={index} />
                        ))
                    }
                    <button onClick={generateMeme} className={dark ? "btn btn-outline-primary m-2" : "btn btn-primary m-2"}>Generate</button>
                    </div>
                </div>
            </div> : <></>}
        <section className={styles.contain}>
            <h3 className={dark ? "text-light text-center pt-5" : "text-dark text-center pt-5"}>Next Memes</h3>
        <div className="container pb-5 ">
            {memes.length ? <div className="row">
                    <div className="col-sm-3" onClick={() => setMemeIndex(memeIndex+1)}>
                        <img className="card-img-top" src={memes[memeIndex + 1].url} alt={memes[memeIndex + 1].name} />
                            <div className="card-body">
                                <h5 className={dark ? "text-light card-title" : "text-dark card-title"}>{memes[memeIndex + 1].name}</h5>                                
                            </div>
                    </div>
                    <div className="col-sm-3" onClick={() => setMemeIndex(memeIndex+2)}>
                        <img className="card-img-top" src={memes[memeIndex + 2].url} alt={memes[memeIndex + 2].name} />
                            <div className="card-body">
                                <h5 className={dark ? "text-light card-title" : "text-dark card-title"}>{memes[memeIndex + 2].name}</h5>                                
                            </div>
                    </div>
                    <div className="col-sm-3" onClick={() => setMemeIndex(memeIndex+3)}>
                        <img className="card-img-top" src={memes[memeIndex + 3].url} alt={memes[memeIndex + 3].name} />
                            <div className="card-body">
                                <h5 className={dark ? "text-light card-title" : "text-dark card-title"}>{memes[memeIndex + 3].name}</h5>                                
                            </div>
                    </div>
                    <div className="col-sm-3" onClick={() => setMemeIndex(memeIndex+4)}>
                        <img className="card-img-top" src={memes[memeIndex + 4].url} alt={memes[memeIndex + 4].name} />
                            <div className="card-body">
                                <h5 className={dark ? "text-light card-title" : "text-dark card-title"}>{memes[memeIndex + 4].name}</h5>                                
                            </div>
                    </div>
                </div> : <></> }
            </div>
            </section>
        </div>
    );
  }
  