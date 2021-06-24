import React, {Component, useEffect, useState} from 'react';
import {Button, Container, Form, FormControl, FormGroup, FormLabel, FormText, Jumbotron} from "react-bootstrap";
import axios from "axios";
import Header from "./Header";

const UpdatePost=({history,match})=> {
    const id = match.params.id
    const [error,setError]= useState('');
    const [title, setTitle]= useState('');
    const [post, setPost]= useState('');
    const [success,setSuccess]=useState('');
    axios.defaults.headers.common = { "Authorization": `Bearer ${localStorage.getItem('authToken')}`}
    const fetchData= async ()=>{

        const config = {
            header: {
                "Content-Type": "application/json"
            },
        };
        try {
            const { data } = await axios.get(
                `/api/private/post/read/${id}`
                ,
                config
            );
            setPost(data.data[0].content)
            setTitle(data.data[0].title)

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    const handlePostChange=(e)=>{
        setPost(e.target.value)
    }
    const handleTitleChange=(e)=>{
        setTitle(e.target.value)
    }

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login');
        }
        fetchData()
    }, [history])



    const  handleClick=async (e)=>{
        e.preventDefault()
       axios.defaults.headers.common = { "Authorization": `Bearer ${localStorage.getItem('authToken')}`}
       const config = {
           header: {
               "Content-Type": "application/json"
           },
       };


        if (post.length!==0||title.length!==0) {

            try {
                const { data } = await axios.put(
                    "/api/private/post/update",
                    {content:post,title,id:id},
                    config);
                setSuccess('Le post a été modifié !')


            } catch (error) {
                setError(error.response.data.error);
            }
        }else {
            setError('Veuillez renseigner les champs')
        }
    }

        return (
            <div>
                <Header history={history}/>
                <Container>
                <Jumbotron className={'mt-4 btn-primary-custom text-center'}>
                    <h1>Modifier</h1>
                </Jumbotron>
                <Form>
                    {success && <span className="success-message">{success}</span>}
                    {error && <span className="error-message">{error}</span>}
                    <FormGroup>
                        <FormLabel>Titre</FormLabel>
                        <FormControl value={title} placeholder={'Veuillez renseigner un titre'}  required onChange={handleTitleChange} />
                    </FormGroup>
                    <FormGroup>
                        <textarea value={post} placeholder={'Veuillez tapper au moins 4 caractères'} required   onChange={handlePostChange}
                        className={'post form-control'} id={'post'}/>
                    </FormGroup>
                    <FormGroup className={'text-center'}>
                         <Button type="submit"  id={'button'} onClick={handleClick} className={'btn-primary-custom'}>Envoyer</Button>

                    </FormGroup>

                </Form>
                </Container>
            </div>
        );

}

export default UpdatePost;