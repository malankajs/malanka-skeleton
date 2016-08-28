import {StringRenderer} from 'malanka/es5/Renderer/StringRenderer';
import {GotRequest} from 'malanka/es5/Request/GotRequest';

import {diConfig} from '../../di.config';
import {createContainer} from 'di.js/build/di.es5';

export function serverRender(req, res, next) {
    let di = createContainer(diConfig);

    di.put('renderer', new StringRenderer());
    di.put('request', new GotRequest({
        baseUrl: 'http://localhost:8000'
    }));

    Promise.resolve(di({router: 'router', 'env': 'env'}, {di}))
        .then(({router, env}) => {
            return router.match(req.url).then(({page}) => {
                return env.render(page)
            });
        })
        .then(body => {
            let definitions = di.getDefinitions(),
                promises = [];

            Object.keys(definitions).forEach(key => {
                let {instance} = definitions[key];

                if (instance && instance.async) {
                    promises = promises.concat(instance.async());
                }
            });

            return Promise.all(promises).then(() => body.toString());
        })
        .then(body => {
            let diData = JSON.stringify(di.serialize()).replace(/</gi, '&lt;');
            return `<head><title>Malanka</title><meta charset="utf-8"><link rel="stylesheet" href="/assets/styles.css"><script>var diData=${diData};</script></head>${body}`;
        })
        .then(content => {
            res.send(content);
        })
        .catch(err => {
            res.json({
                err: err && err.message,
                stack: err && err.stack && err.stack.split('\n')
            })
        })
        .then(() => {
            di.destroy();
        });
}
