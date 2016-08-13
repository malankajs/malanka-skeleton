import {Component, Defaults} from 'malanka';

import styles from './Header.css';
import template from './Header.hbs';

@Defaults({
    template,
    styles,
    tagName: 'header'
})
export class Header extends Component {

}