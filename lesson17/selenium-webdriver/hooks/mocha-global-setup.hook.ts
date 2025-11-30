import { initGlobal } from 'global';

exports.mochaGlobalSetup = function () {
    console.log('global hook');
    initGlobal();
};

exports.mochaGlobalTeardown = function () {
    console.log('global teardown');
};
