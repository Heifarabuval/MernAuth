import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Container, Jumbotron} from "react-bootstrap";
import Header from "./Header";


const DetailPostScreen = ({history,match}) => {
    axios.defaults.headers.common = { "Authorization": `Bearer ${localStorage.getItem('authToken')}`}
    const [error,setError]= useState("");
    const [post,setPost]= useState("")
    const config = {
        header: {
            "Content-Type": "application/json"
        },
    };
    const fetchData= async ()=>{
        try {
            const { data } = await axios.get(
                `/api/private/post/read/${match.params.id}`
                ,
                config
            );

            setPost(data.data[0])
            console.log(post)

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    const handleDelete= async (e)=>{
        console.log(e.target.value)

        try {

            const { data } = await axios.delete(
                `/api/private/post/delete`
                ,{ data: { id: e.target.value }, headers: { "Content-Type": "application/json" } }

            );

            setPost(data.data[0])
            window.location.replace("/"+localStorage.getItem('userId'));

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login');
        }
        fetchData()
    }, [history])

    return (
        <div>
        <Header history={history}/>
          <Container className={'mt-5 text-center'}>
              <Jumbotron className={'text-center btn-primary-custom'}>
                  <h2> {post.title}</h2>
                  <span><strong>Date :</strong>{new Date(post.createdAt).getDate()+"/"+new Date(post.createdAt).getMonth()+"/"+new Date(post.createdAt).getFullYear()}</span>
                  <p>  {post.content}</p>
              </Jumbotron>
              <Container className={'d-flex justify-content-between'}>
                  <Button href={'/post/update/'+post._id} variant={'success'}>Modifier</Button>
                  <Button value={post._id} variant={'danger'} onClick={handleDelete}>Spprimer</Button>
              </Container>
          </Container>
        </div>
    );
};

export default DetailPostScreen;
