import * as React  from 'react';

type G = typeof obj;
declare global {
    const React: typeof React;
    const log: typeof console.log;
}
