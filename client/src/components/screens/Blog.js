import React, {Component, useEffect, useState} from 'react';
import axios from "axios";
import Header from "./Header";
import {Button, Container, Form, FormGroup, Jumbotron} from "react-bootstrap";
import "./Blog.css";
import AddPost from "./AddPost";

const Blog = ({history}) => {

    axios.defaults.headers.common = { "Authorization": `Bearer ${localStorage.getItem('authToken')}`}
    const config = {
        header: {
            "Content-Type": "application/json"
        },
    };
    const [error, setError] = useState('');
    const [comment, setComment] = useState('');

    const [posts, setPosts] = useState('');



    const handleCommentsChange=(e)=>{
        console.log(e.target.value)
        setComment(e.target.value)
    }

    const handleDelete= async (e)=>{
        console.log(e.target.value)
        try {

            const { data } = await axios.delete(
                `/api/private/comment/delete`
                ,{ data: { id: e.target.value }, headers: { "Content-Type": "application/json" } }

            );


           fetchPrivateData()

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }


    const handleCommentsSend= async (e)=>{
        console.log(e.target.value)
        if (e.target.value.length!==0&&comment.length!==0) {
const postId=e.target.value;
            try {
                const { data } = await axios.post(
                    "/api/private/comment/add",
                    {content:comment,postId:postId},
                    config);

               fetchPrivateData()
                setComment('')
            } catch (error) {
                setError(error.response.data.error);
            }
        }else {
            setError('Veuillez renseigner les champs')
        }
    }

    const fetchPrivateData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
        try {
            const {data} = await axios.get("/api/private/post/read", config);
            setPosts(data.data)
            console.log(posts)


        } catch (error) {
            localStorage.removeItem('authToken');
            setError('Accès interdit veuillez vous connecter')
        }

    }
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login');
        }
        fetchPrivateData()
    }, [history])

    return (
        <div>
            <Header history={history}/>
            <Container className={'mt-4'}>
                <AddPost method={fetchPrivateData} />
            </Container>
            {Object.keys(posts).map((key, post) => (
                <Container className={'mt-4'}>
                    <Jumbotron className='jumbo-custom  text-center'>
                        <a className={'h4'} key={posts[post]._id} href={'/post/' + posts[post]._id}>
                            {posts[post].title}
                        </a>
                        <Container><p>{posts[post].content}</p></Container>
                        <Form method={'post'}>
                        <FormGroup className={'mt-3'}>
                        <textarea onChange={handleCommentsChange} placeholder={'Veuillez tapper au moins 4 caractères'} required
                                  className={'post form-control'}  id={'comment'}>{comment}</textarea>
                            <Button value={posts[post]._id} onClick={handleCommentsSend} className={'btn-primary mt-2'}>Commenter</Button>
                        </FormGroup>

                        </Form>


                        <Container className={'mt-4'}>

                            {posts[post].comments.map((answer, i) => {
                                if (answer!=null){

                                    return  <Jumbotron className='jumbo-custom d-flex justify-content-around text-center'>

                                        {answer.comment.content}

                                        <Button value={answer.comment._id} onClick={handleDelete} variant={"danger"}>X</Button>

                                    </Jumbotron>
                                }

                            })}
                            {console.log(posts[post].comments[comment])}

                        </Container>
                    </Jumbotron>
                </Container>


            ))}
        </div>
    );
}


export default Blog;