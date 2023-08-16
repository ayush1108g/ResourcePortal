import React from 'react';
import CourseGoalItem from './CourseGoalItem';
import classes from './CourseGoalList.module.css'
import Card from '../UI/Card';

const CourseGoalList = (props) => {
  
  return (
    <ul className={classes["goal-list"]}>
      {props.items.map(goal => (
        <CourseGoalItem
          key={goal.id}
          id={goal.id}
          memSignInstate={props.memSignInstate}
          onDelete={props.onDeleteItem}
        >  
        
          <h2>{goal.heading}</h2>
          <a href={goal.contentLink} target='_blank' >{goal.content}</a>
          
        </CourseGoalItem>
      ))}
    </ul>

  );
};

export default CourseGoalList;
