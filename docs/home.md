[![Build Status](https://travis-ci.com/nosachamos/react-circular-reveal.svg?branch=master)](https://travis-ci.com/nosachamos/react-circular-reveal)
[![codecov](https://codecov.io/gh/nosachamos/react-circular-reveal/branch/master/graph/badge.svg)](https://codecov.io/gh/nosachamos/react-circular-reveal)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![npm](https://img.shields.io/npm/v/react-circular-reveal.svg)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/nosachamos/react-circular-reveal.svg)
![GitHub](https://img.shields.io/github/license/nosachamos/react-circular-reveal.svg)

Transparent entity management so clean you may never make an api request manually again.

# Installation

```sh
yarn add react-circular-reveal
```

or

```sh
npm install react-circular-reveal --save
```

# Usage

The circular reveal panel manages two components: one that is displayed by default, and one that is "revealed" on top of
it when the circular reveal animation takes place. 

```jsx
<CircularRevealPanel
        reveal={isOpened}
        revealContent={
            <div>
                {/* When the reveal animation happens, I am displayed beautifully through a
                circular reveal animation and, as long as I am not transparent, will cover
                the div below */}
            </div>
        }
    >

    <div>
        {/* I am displayed by default, and covered by the `revealContent` element when the
        reveal animation takes place */}
    </div>
</CircularRevealPanel>
```

#### Key points:
 - The `reveal` prop determines whether the circular reveal takes place or not. Set it to `true` to have the reveal content
 be displayed on top of the default content.

 - The reveal animation will by default open and close towards the current mouse location, which is automatically tracked fo you.
 In the example above, you don't need to do anything to make it look like the content opened from the tip of the mouse cursor. Awesome!
 
 - Everything can be customized, so you can be creative and create impressive UIs that are only normally seen in native applications.

## Example

```jsx
<CircularRevealPanel
    reveal={isOpened}
    revealContent={
        <div className={'revealed'} onClick={() => setOpened(false)}>
            <h2>I am revealed with a circular animation.</h2>
            <span>(Click anywhere to close)</span>

            <h1>Awesome!</h1>
        </div>
    }
>

    <div className={'content'} onClick={() => setOpened(true)}>
        <h1>I am the main content</h1>
        <span>(Click anywhere to trigger a circular reveal)</span>
    </div>

</CircularRevealPanel>
```

Results in:

![npm](_media/reveal.gif)

# Props

The CircularRevealPanel component accepts the following props:


| Prop  |     Type     |  Required  | Default | Description |
| ----- | ---------------- | ---- | --- | ----------- |
| `revealContent` | `React Node` | yes | N/A |Receives the content to be revealed through the circular reveal animation. |
| `reveal` | `boolean` | no | `false` |A value indicating whether to display the reveal content or not. |
| `revealCurtainContent` | `React Node` | no | `undefined` | Only needed for advanced customizations, this prop may be used to insert elements within the reveal curtain. |
| `speed` | `string` or `function` | no | `normal` | The valid string values are `very slow`, `slow`, `normal` (default), `fast`. Most likely these will suffice. For advanced customizations, see below. |
| `contentMinWidth` | `number` | no | 500 | The minimum width for the content to be revealed, in pixels. This prevents the content from appear to rearrange as the curtain expands. |


# Advanced Customizations

Customizing the opening/closing `speed`

The speed with which to open or close the circular reveal animation. Can be a `string` or a `function`.

The valid string values are `very slow`, `slow`, `normal` (default), `fast`. Most likely these will suffice.

If you find however that you need to further customize it, you may pass in a function which will be invoked on every step of the reveal animation and must return the next size for the *reveal curtain* (the circular region that displays the reveal content). 

his function is given two parameters - the current size of the reveal curtain, and whether the curtain is opening or closing.

For reference, this is the function that implements the `normal` speed:

```jsx
const resizeCurtainFunction = (size, opening) => {
    return opening ? size + Math.max(size/3, 5) : size - Math.max(size/3, 5);
};

<CircularRevealPanel
        reveal={isOpened}
        speed={resizeCurtainFunction}
        revealContent={
            ...
        }
    >

    ...
    
</CircularRevealPanel>
```



