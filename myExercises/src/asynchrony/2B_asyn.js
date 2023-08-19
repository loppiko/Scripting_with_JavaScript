const axios = require('axios');
// const _ = require('lodash');

const random = () => Math.floor(Math.random() * 100);

const postsArray = [];
const commentsArray = [];

Array(5).fill(0).forEach(() => {
    const randomNumber = random();
    postsArray.push(
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${randomNumber}`)
            .then((res) => res.data)
    );
    commentsArray.push(
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${randomNumber}/comments`)
            .then((res) => res.data)
    );
})

Promise.all([Promise.all(postsArray), Promise.all(commentsArray)])
    .then(([posts, comments]) => {
        const result = posts.reduce((acc, curr, i) => [
            ...acc, 
            {"entry": {"title": curr.title, "body": curr.body},
             "comments": comments[i].reduce((acc2, curr2) => [...acc2, {"name": curr2.name, "email": curr2.email, "body": curr2.body}]
            , [])}], [])

        console.dir(result, {depth: null});
    })