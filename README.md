# ngx-jest-snapshot-serializer
[![npm](https://img.shields.io/npm/v/ngx-jest-snapshot-serializer.svg)](https://www.npmjs.com/package/ngx-jest-snapshot-serializer)
[![Build Status](https://travis-ci.org/yurii-sorokin/ngx-jest-snapshot-serializer.svg?branch=master)](https://travis-ci.org/yurii-sorokin/ngx-jest-snapshot-serializer)
[![codecov](https://codecov.io/gh/yurii-sorokin/ngx-jest-snapshot-serializer/branch/master/graph/badge.svg)](https://codecov.io/gh/yurii-sorokin/ngx-jest-snapshot-serializer)


Plugin that serializes Angular fixture components for [Jest snapshot tests](https://facebook.github.io/jest/docs/en/snapshot-testing.html).

# Install

```console
$ npm install --save-dev ngx-jest-snapshot-serializer
```

# Usage

For an individual test file:

```js
import serializer from 'ngx-jest-snapshot-serializer';
expect.addSnapshotSerializer(serializer);
```

For all test files, you need to specify serializer in Jest configuration. For example, in a `package.json` file:

```json
{
  "jest": {
    "snapshotSerializers": ["ngx-jest-snapshot-serializer"]
  }
}
```

If you do not set up jest testing in your Angular application yet then look at [this preset](https://github.com/thymikee/jest-preset-angular).

# Example

 Example snapshot outputs could be found in the `examples/` directory.


# Further reading

More details about snapshot plugins could be found in [Pretty format package](https://github.com/facebook/jest/tree/v22.4.0/packages/pretty-format#usage-in-jest).

___

Highly inspired by [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json/) package.


