import {webpackResolver, staticResolver} from 'di.js/build/di.es5';
import {BodyContainer} from './components/BodyContainer/BodyContainer';
import {Environment, Model, Collection} from 'malanka';

export let diConfig = {
    resolvers: [
        webpackResolver([
            require.context('./models', true, /\.js$/),
            require.context('./collections', true, /\.js$/),
            require.context('./states', true, /\.js$/),
            require.context('./lib', true, /\.js$/),
            require.context('./components', true, /(Header|Page)\.js$/)
        ]),
        staticResolver({
            BodyContainer,
            Environment,
            Collection,
            Model
        })
    ],
    dependencies: {
        // routes

        home: ['!BodyContainer', {
            content: 'homePage'
        }],

        error: ['!BodyContainer', {
            content: 'errorPage'
        }],

        // Pages

        BodyContainer: {
            env: 'env',
            header: 'Header'
        },

        homePage: ['HomePage', {
        }],

        errorPage: ['ErrorPage', {

        }],
        
        // Components

        // Data models & collections

        // States

        // Infrastructure

        env: ['Environment', {
            renderer: 'renderer',
            router: 'router'
        }],

        router: 'Router'
    }
};