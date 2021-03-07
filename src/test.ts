// copied from https://itnext.io/angular-testing-series-how-to-add-jest-to-angular-project-smoothly-afffd77cc1cb

import 'jest-preset-angular/setup-jest';

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
      display: 'none',
      appearance: ['-webkit-appearance'],
    }),
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
      enumerable: true,
      configurable: true,
    }),
});
