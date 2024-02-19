# Live Code Editor

Example:

```jsx
import LiveCode from "../src/LiveCode";

<LiveCode initialValue={`let fizzBuzz = function (n) { }`} />;
```

## Parameters

| Parameters | Default Value | Type Options | Example Use                       | Reasoning                                                                                        |
| ---------- | ------------- | ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| exact      | " "           | `string`     | `let fizzBuzz = function (n) { }` | Add in a default function, comments or code to start people off                                  |
| renderNow  | false         | `boolean`    | true                              | Whether or not to immediately load the output. Get a button instead for rendering code on demand |
