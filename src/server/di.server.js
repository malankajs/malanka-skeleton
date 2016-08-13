import {webpackResolver} from 'di.js/build/di.es5';

export let config = {
    resolvers: [
        webpackResolver([
            require.context('./', true, /\.js$/)
        ])
    ],
    dependencies: {

    }
};