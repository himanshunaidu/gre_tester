import React from 'react';

import classes from './EndTest.module.css';
import Button from '../UI/Button/Button';
import * as ButtonClasses from '../UI/Button/ButtonClasses';

const endTest = (props) => {
    return (
        <div className={classes.EndTest}>
            <p>Are you sure about Ending the Test</p><br></br>
            <Button disabled={false} btnType={ButtonClasses.DANGER} onClick={props.cancel}>Cancel</Button>
            <Button disabled={false} btnType={ButtonClasses.SUCCESS} onClick={props.submit}>Submit</Button><br></br>
        </div>
    )
}

export default endTest;