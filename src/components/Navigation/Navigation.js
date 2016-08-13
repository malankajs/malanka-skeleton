import {Component, Defaults} from 'malanka';

import template from './Navigation.hbs';
import styles from './Navigation.css';

@Defaults({
    styles,
    template,

    links: [
        {title: 'Home', route: 'home'}
    ]
})
export class Navigation extends Component {

}