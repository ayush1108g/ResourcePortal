import React, { useState } from "react";
import Button from "../UI/Button";
import classes from './InputItem.module.css'


const InputItem = (props) => {
    const [additem, setAddItem] = useState(true);
    const [enteredHeading, setEnteredHeading] = useState('');
    const [enteredContent, setEnteredContent] = useState('');
    const [enteredContentLink, setEnteredContentLink] = useState('');
    const [isValid, setIsValid] = useState(true);


    const headingChangeHandler = event => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredHeading(event.target.value);
    };

    const contentChangeHandler = event => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredContent(event.target.value);
    };

    const linkChangeHandler = event => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredContentLink(event.target.value);
    };

    const formSubmitHandler = event => {
        event.preventDefault();
        if (!isValid) {
            setIsValid(false);
            return;
        }
        let link = enteredContentLink.toString();
        if (!link.startsWith("http://") && !link.startsWith("https://")) {
            link = "http://" + link;
        }
        props.onAddContent({
            id: Math.floor(Math.random()).toString(),
            heading: enteredHeading,
            content: enteredContent,
            contentLink: link,
        });

        setEnteredHeading('');
        setEnteredContent('');
        setEnteredContentLink('');

    };

    const addItemHandler = () => {
        setAddItem(!additem);
    };

    return (
        <React.Fragment>
            {additem && <Button type="button" onClick={addItemHandler}>Add Item</Button>}
            {!additem && <form onSubmit={formSubmitHandler} className={classes['form-control']} >
                <hr></hr>
                <label>Course Item</label>
                <input type="heading" placeholder="Heading" onChange={headingChangeHandler} value={enteredHeading} required ></input>
                <br />
                <input type="text" placeholder="Content" onChange={contentChangeHandler} value={enteredContent} required />
                <br />
                <input type="link" placeholder="Content-link" onChange={linkChangeHandler} value={enteredContentLink} required></input>
                <p>* Do not add http:// in link</p>
                <br />
                <div className={classes["horizontal-line"]}>
                    <div className={classes.line}></div>
                    <div className={classes.or}>or</div>
                    <div className={classes.line}></div>
                </div>
                <br />
                <input type="file" placeholder="flie" ></input>
                <br />
                <Button type="submit">Add Item</Button>
                <Button type="button" onClick={addItemHandler}>Cancel</Button>
                <hr></hr>
                <br />
            </form>}
        </React.Fragment>
    );
};

export default InputItem;