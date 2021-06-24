import React, {Component, useEffect, useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel, FormText} from "react-bootstrap";
import axios from "axios";

const AddPost=(postm)=> {

    const [error,setError]= useState('');
    const [title, setTitle]= useState('');
    const [post, setPost]= useState('');

    const handlePostChange=(e)=>{
        setPost(e.target.value)
    }
    const handleTitleChange=(e)=>{
        setTitle(e.target.value)
    }



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
                const { data } = await axios.post(
                    "/api/private/post/add",
                    {content:post,title},
                    config);
                setTitle("")
                setPost("")
                const method=postm.method
                method()

            } catch (error) {
                setError(error.response.data.error);
            }
        }else {
            setError('Veuillez renseigner les champs')
        }
    }

        return (
            <div>
                <Form  className={'border border-primary p-3 rounded'}>
                    {error && <span className="error-message">{error}</span>}
                    <FormGroup>
                        <FormLabel>Titre</FormLabel>
                        <FormControl placeholder={'Veuillez renseigner un titre'} value={title} required onChange={handleTitleChange} />
                    </FormGroup>
                    <FormGroup>
                        <textarea  placeholder={'Veuillez tapper au moins 4 caractères'} required   onChange={handlePostChange}
                        className={'post form-control'} id={'post'} value={post}/>
                    </FormGroup>
                    <FormGroup className={'text-center'}>
                         <Button type="submit"  id={'button'} onClick={handleClick} className={'btn-primary-custom'}>Envoyer</Button>

                    </FormGroup>

                </Form>
            </div>
        );

}

export default AddPost;