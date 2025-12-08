import React from 'react';
import './index.css';

type Props = {
    name: string;
    surname: string;
    title: string;
    image: string;
};

const Task2: React.FC<Props> = ({ name, surname, title, image }) => (
    <header id='user'>
        <h2>{ name } { surname }</h2>
        <img src={ image } />
        <p>{ title }</p>
    </header>
);

export default Task2;