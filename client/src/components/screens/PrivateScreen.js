import {useState,useEffect} from 'react'
import axios from "axios";
import Header from "./Header";
import {Container, Jumbotron} from "react-bootstrap";

const PrivateScreen =({history})=>{
    const[error,setError]= useState('');
    const [posts, setPosts]= useState('');


    useEffect(()=>{
        if(!localStorage.getItem('authToken')){
            history.push('/login');
        }
    },[history])

    const logoutHandler=()=>{
        localStorage.removeItem('authToken');
        history.push("/login")
    }



    return(
        error ? <span className="error-message">{{error}}</span>:
            <div>
                <Header history={history}/>
                {/*{Object.keys(posts).map((key, post) => (
                        <a key={posts[post]._id} href={posts[post]._id}>{posts[post].title}</a>
                ))}*/}
                <Container className='mt-5'>
                    <Jumbotron className='jumbo-custom text-primary-custom text-center'>
                        <h1>Bienvenue sur HypBlog</h1>
                    </Jumbotron>
                </Container>

            </div>
    )
}

export default PrivateScreen;