[![Build Status](https://travis-ci.com/nosachamos/react-circular-reveal.svg?branch=master)](https://travis-ci.com/nosachamos/react-circular-reveal)
[![codecov](https://codecov.io/gh/nosachamos/react-circular-reveal/branch/master/graph/badge.svg)](https://codecov.io/gh/nosachamos/react-circular-reveal)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![npm](https://img.shields.io/npm/v/react-circular-reveal.svg)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/nosachamos/react-circular-reveal.svg)
![GitHub](https://img.shields.io/github/license/nosachamos/react-circular-reveal.svg)

**react-circular-reveal** allows you do quickly and easily setup Material Design's "Circular Reveal" animation in your app.

<p align="center">
<img src="https://github.com/nosachamos/react-circular-reveal/raw/master/docs/logo.png" alt="react-circular-reveal" style="max-width:100%;">
</p>
<p align="center">Simple, tiny, extensible, intuitive, documented, fully tested, magical.</p>

<br/>

# Installation

```sh
yarn add react-circular-reveal
```

or

```sh
npm install react-circular-reveal --save
```

# Sample Usage

```jsx
import { usereact-circular-reveal } from 'react-circular-reveal';

const UserProfileComponent = () => {
  const { formRef, useInput, errors, isValid } = usereact-circular-reveal();

  return (
    <form ref={formRef}>
      <input {...useInput('name', ['isRequired'])} />
      <span>{errors['name']}</span>

      <input {...useInput('email', ['isRequired', 'isEmail'])} />
      <span>{errors['email']}</span>

      <button disabled={!isValid} type="submit">
        Submit
      </button>
    </form>
  );
};
```

For a complete guide on how each of these pieces work, see our [tutorial](docs/tutorial.md).

# In a Nutshell

Use the `usereact-circular-reveal` hook to gain access to the `useInput` hook, the errors currently in your form, whether the form is valid or not [and more](docs/usereact-circular-reveal-hook.md).

Then, use the `useInput` to [setup validations](docs/examples.md) on your form inputs.

react-circular-reveal offers two [built in validators](docs/builtin-validators.md) out-of-the-box and it integrates with the awesome [validator](https://www.npmjs.com/package/validator) library seamlessly, which means if you install it [you can use all of their validators](docs/third-party-validators.md).

But know that writing your own [custom validators](docs/custom-validators.md) is super easy.

Also, you may create [global validators](docs/global-validators.md) so that they accessible throughout your app. Doing so helps keep your code DRY and facilitates maintaining it.

Finally, if you use [Material UI](https://material-ui.com/) you may like the fact react-circular-reveal [integrates](docs/material-ui.md) with it. If you use some other UI framework, chances are you can tweak our [settings](docs/settings.md) to make it work with it.

# Contributing

Contributions are very welcome!

We follow the "fork-and-pull" Git workflow.

1. **Create a Fork and clone it**

   Simply click on the “fork” button of the repository page on GitHub.

   The standard clone command creates a local git repository from your remote fork on GitHub.

2. **Modify the Code**

   In your local clone, modify the code and commit them to your local clone using the git commit command.

   Run `npm test` and make sure all tests still pass.

   Run `tslint --project .` and make sure you get no warnings.

3. **Push your Changes**

   Make sure to update affected tests and/or add tests to any new features you may have created.

   We are very careful to make sure coverage does not drop.

4. **Create a Pull Request**

   We will review your changes and possibly start a discussion.

   If changes are required, you can simply push these changes into your fork by repeating steps #3 and #4 and the pull request is updated automatically.

## License

MIT

---

Created and maintained by **[`Eduardo Born`](http://github.com/nosachamos)** with ❤ and coffee
