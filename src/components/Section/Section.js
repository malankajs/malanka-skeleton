import {Component, Defaults} from 'malanka';

import styles from './Section.css';
import template from './Section.hbs';

@Defaults({
    template,
    styles,
    tagName: 'section'
})
export class Section extends Component {

}