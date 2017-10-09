
#Sitecore Boilerplate Frontend

##Content
[About](#About)
----[Browser Matrix](#BrowserMatrix)
----[Mobile Matrix](#MobileMatrix)
----[Technologies Used](#TechnologiesUsed)
----[Architecture](#Architecture)
[Getting Started](#GettingStarted)
----[Prerequisites](#Prerequisites)
----[Setup](#Setup)
[Development](#Development)
----[Branches](#Branches)

----------

##<a name="About"></a>About

The site is component based rendering Handlebar templates from JSON context files.
Because the pages are rendered as static HTML we have created a small JavaScript lib called 'Snappy'.

This library searches the DOM for component elements via tagname. For all it finds it creates a Snappy Component instance. This enables us to use reusable, isolated, object-orientated components.


###<a name="BrowserMatrix"></a>Browser Matrix

| **OS**  | **OS Version**  |**Browser**| **Browser Version** | **Testing Type** |
|---      |---              |---        |---                  |---               |
|OSX  | 10.10              |  Safari     | Latest        | **Primary**             |
|OSX  | 10.11              |  Chrome, Firefox, Safari     | Latest        | **Primary**             |
|Windows  | 7              |  Chrome     | 13+ Latest        | **Primary**             |
|Windows  | 10              |  Edge     | Latest        | **Compatibility**             |
|Windows  | 8.1               |  IE       | 11                  | **Reference**             |
|Windows  | 8.0               |  IE       | 10                  | **Compatibility**             |
|Windows  | 7               |  IE       | 11                  | **Reference**             |
|Windows  | 7               |  Firefox       | Latest                  | **Compatibility**             |

###<a name="MobileMatrix"></a>Mobile Matrix

| **Device**  | **OS**  | **OS Version**  |**Browser**| **Browser Version** | **Testing Type** |
|---   |---   |---              |---        |---                  |---               |
|IPhone       | IOS     |  9.*+           | Safari    | -|**Primary** |
|IPad| IOS     |  9.*+           | Safari    | -|**Primary** |
|Galaxy S7/ Edge| Android |  6.0.0           | Native Browser | -|**Compatibility** |
|LG Nexus 7| Android |  4.4.4           | Chrome | -|**Primary** |

For a comprehensive device list and support details refer to the [FA-Browser Matrix](https://docs.google.com/spreadsheets/d/1-codgdXDtsO7U361iD77taoYk4RY2KyPK2CtArwT6es)


###<a name="TechnologiesUsed"></a>Technologies Used
Here is a list of the frameworks, libraries and tools used to build this project:

####Front-end

* Handlebars v4.0.5 ([link](https://github.com/wycats/handlebars.js/))
* Snappy v0.1 ([link](https://github.com/stuhuntington/snappyjs))
* JQuery v3.0 ([link](https://github.com/jquery/jquery))
* Underscore v1.8.3 ([link](https://github.com/jashkenas/underscore))
* Bootstrap v3.3.7 ([link](http://getbootstrap.com))


####Build Tools

* Gulp v3.9.1 ([link](https://github.com/gulpjs/gulp))
* Browserify v13.0.1 ([link](example))
* Babelify v7.3.0 ([link](https://github.com/babel/babelify))
* Sass v3.4.23 ([link](https://github.com/sass/sass))

###<a name="Architecture"></a>Architecture
Here is an overview of the project architecture:

```
Assets
    |- Fonts
    |- Images
Components
    |- componentName
        |- Scripts
             |- componentName.js
        |- Styles
             |- _component-name.scss
        |- componentName.hbs
        |- componentName.json (mock data)
Layouts
    |- header.hbs
Libs
    |- Snappy
Scripts
    |- genericScripts
Styles
    |- genericStyles
```

##<a name="GettingStarted"></a>Getting Started

###<a name="Prerequisites"></a>Prerequisites
This repo requires you to install [Ruby](https://www.ruby-lang.org/en/downloads/) and [scss_lint](https://github.com/brigade/scss-lint).

`gem install scss_lint`

 You are going to need:

 * Node  ([link](https://nodejs.org/en/)) `brew update` `brew install node`
 * GulpCli ([link](https://www.npmjs.com/package/gulp-cli)) `npm install gulp-cli`

####Environments
This project has been built and tested on the following machines/systems:

* Windows 10
* Mac

###<a name="Setup"></a>Setup
1. clone repo
2. `cd` into project folder
3.  Run the following:
 * `npm install`
 * `gulp build`
 * `gulp`
4. Browse to `localhost:9111`

----------

##<a name="Development"></a>Development

In order to create a component you must include the javascript and styles in the `main.js` and `main.scss` files respectively

```
require('../components/modal/scripts/modal');

---

@import '../components/tickets/styles/tickets';

```

###<a name="Branches"></a>Branches
| **Branch** | **Description**  |
|---      |---              |
|develop| This branch is used for stable development source code and will be used to compile code for staging.|
|staging| This branch is compiled code for staging servers. This code should be the compiled code from develop branch.|
|uat|This branch is compiled code QA.|
|master| This branch should be the source code deployed to the live environment. Do not merge into this branch unless you wish to deploy live.|
|release| This branch will have the compiled source code from the master branch and will be the code deployed to the live environment|

####Creating Branches

Always create a branch from **develop**.

To create a **feature** branch, follow the naming convention below:
```
feature/FA-1234/feature-name
```

To create a **bug-fix** branch, follow the naming convention below:
```
bug-fix/FA-0987/bug-name
```

To create a **hot-fix** branch, follow the naming convention below:
```
hot-fix/FA-8712/fix-name
```
