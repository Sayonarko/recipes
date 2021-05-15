import { Avatar, Box, Divider, Typography, makeStyles, Input, InputLabel, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';


export default function PostComponents(props) {
    const classes = useStyles()
    const { postId } = props
    const [update, setUpdate] = useState(false)
    const [comments, setComments] = useState([])
    const [value, setValue] = useState({
        author: "",
        date: "",
        text: ""
    })

    useEffect(() => {
        fetch(`http://localhost:4000/posts/${postId}`)
            .then((response) => response.json())
            .then(result => setComments(result.comments))
            .catch(error => console.log(error))
    }, [postId, update])

    function Comment(props) {

        function formateCommentDate(date) {
            const newDate = new Date(date)
            let dd = newDate.getDate()
            if (dd < 10) dd = '0' + dd
            let mm = newDate.toLocaleString('ru', { month: "short" });
            let yyyy = newDate.getFullYear()
            let hours = newDate.getHours()
            if (hours < 10) hours = '0' + hours
            let min = newDate.getMinutes()
            if (min < 10) min = '0' + min

            if ((Date.now() - Date.parse(date)) < 8.64e+7) {
                return `сегодня @ ${hours}:${min} `
            }

            if ((Date.now() - Date.parse(date)) > 8.64e+7 && (Date.now() - Date.parse(date)) < 8.64e+7 * 2) {
                return `вчера @ ${hours}:${min} `
            }

            return `${dd} ${mm} ${yyyy} @ ${hours}:${min} `
        }

        return (
            <Box display="flex"
                alignItems="center"
                flexDirection="row"
                className={classes.root}
            >
                <Avatar
                    className={classes.avatar}
                    variant="circular"
                    src={props.img}
                    alt={props.author} />
                <Box width="100%">
                    <Box display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between">
                        <Typography variant="h3">{props.author}</Typography>
                        <Typography variant="button" color="secondary" >{formateCommentDate(props.date)}</Typography>
                    </Box>
                    <Divider className={classes.divider} color="secondary" />
                    <Box width="100%">
                        <Typography variant="body1">{props.text}</Typography>
                    </Box>
                </Box>
            </Box>
        )
    }

    function addComment(event) {
        event.preventDefault()
        const newComments = [value, ...comments]
        fetch(`http://localhost:4000/posts/update/comments/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComments)
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .then(() => setUpdate(!update))
            .catch(error => console.log(error))
        setValue({
            author: "",
            date: "",
            text: ""
        })
    }

    return (
        <Box>
            <Typography variant="h2" gutterBottom>
                {comments.length}
                {comments.length === 1
                    ? " Комментарий"
                    : !comments.length
                        ? " Комментариев"
                        : (comments.length % 2 || 3 || 4) && comments.length < 10
                            ? " Комментария"
                            : " Комментариев"}
            </Typography>
            {comments.length
                ? comments.map((item, id) => <Comment key={id} {...item} />)
                : <Typography
                    variant="body1"
                    color="secondary">
                    Оставьте первый комментарий!
                 </Typography>}

            <Box mt={{ xs: 4, sm: 10, md: 20 }}>
                <Typography variant="h2">Оставить комментарий</Typography>

            </Box>
            <Box component="form" onSubmit={(e) => addComment(e)}
            >
                <InputLabel htmlFor="name" className={classes.label}
                >Имя</InputLabel>
                <Input
                    fullWidth
                    required
                    disableUnderline
                    id="name"
                    value={value.author}
                    onChange={(e) => setValue({
                        author: e.target.value,
                        date: new Date().toISOString(),
                        text: value.text
                    })}
                />

                <InputLabel htmlFor="text" className={classes.label}
                >Комментарий</InputLabel>
                <Input
                    fullWidth
                    multiline
                    rows={10}
                    required
                    disableUnderline
                    input="textarea"
                    id="text"
                    placeholder="Просто напишите что-нибудь..."
                    value={value.text}
                    onChange={(e) => setValue({
                        author: value.author,
                        date: new Date().toISOString(),
                        text: e.target.value
                    })}
                />
                <Box mt={{ xs: 5, sm: 10 }} textAlign="right">
                    <Button type="submit" >Отправить</Button>
                </Box>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& + &": {
            marginTop: 30
        }
    },

    avatar: {
        width: 100,
        height: 100,
        marginRight: 30,

        [theme.breakpoints.down("sm")]: {
            width: 70,
            height: 70,
        },

        [theme.breakpoints.down("xs")]: {
            width: 50,
            height: 50,
            marginRight: 5,
        }
    },
    divider: {
        marginTop: 15,
        marginBottom: 15,
        [theme.breakpoints.down("xs")]: {
            marginTop: 5,
            marginBottom: 5,
        }
    },
    label: {
        marginTop: 30,
        marginBottom: 15,

        [theme.breakpoints.down("xs")]: {
            marginTop: 20,
            marginBottom: 10
        }
    }

}))