# Starterlight Tasks

- [Usage](#usage)
- [Options](#options)
- [Boilerplate Config Object](#boilerplate-config-object)

## Usage

1. Set a global configuration object:
    ```
    global.SLoptions = { /* options */ };
    ```
2. Load the gulp tasks:
    ```
    const { tasks } = = require('@zivtech/starterlight-tasks');

    for(let task in tasks) {
      exports[task] = tasks[task];
    }
    ```

## Options

**sourcemaps** (bool)

Turn Sass sourcemaps on or off.

**sass** (obj)

- **paths** (obj)
  - **src**: A glob of Sass files to be compiled into CSS.
  - **dest**: The directory the compiled CSS file will be placed in.
- **config**: An object of [node-sass configuration options](https://github.com/sass/node-sass#options).

**js** (obj)

- **paths** (obj)
  - **src**: A glob of JS files to lint.
- **eslint**: An object of [eslint configuration options](https://eslint.org/docs/user-guide/configuring). This will typically be unused since we inherit our linting rules from Drupal core.

**sassGlob** (obj)

An object of [gulp-sass-glob configuration options](https://github.com/mikevercoelen/gulp-sass-glob).

**sassLint** (obj)

An object of [sass-lint configuration options](https://github.com/sasstools/sass-lint#configuring).

**postcss** (obj)

- **postcssPresetEnv**: An object of [postcss-preset-env configuration options](https://github.com/csstools/postcss-preset-env#options). Use this if you need to support older browsers (e.g. IE11) but want to use newer CSS specifications. See https://preset-env.cssdb.org/features for a list of features this helps support.
- **postcssSortMediaQueries**: An object of [postcss-sort-media-queries configuration options](https://www.npmjs.com/package/postcss-sort-media-queries).
- **cssnano**: An object of [cssnano configuration options](https://cssnano.co/guides/presets). We use the default preset and override a few of its optimization options.

**favicons** (obj)

- **paths** (obj)
  - **src**: The path to the image file from which the rest of the favicons will be created.
  - **dest**: The directory the generated favicons will be placed in.
  - **templateFile**: The name of the template file where favicons will be injected. This should be to `html.html.twig` unless you changed where the injection tags are located.
  - **templateDir**: The path to the directory where the `templateFile` lives.
- **config**: An object of [favicons configuration options](https://github.com/itgalaxy/favicons#usage).

**browserSync** (obj)

An object of [Browsersync configuration options](https://www.browsersync.io/docs/options).

## Boilerplate Config Object

Here are the defaults we use. You can copy this and configure to fit your needs.

### JS
```
{
  sass: {
    sourcemaps: true,
    paths: {
      src: ["./scss/**/*.scss"],
      dest: "./css/"
    },
    config: {
      outputStyle: "expanded"
    }
  },
  js: {
    paths: {
      src: ["./js/**/*.js"]
    },
    eslint: {}
  },
  sassGlob: {},
  sassLint: {
    files: {
      ignore: ["scss/00-base/settings/**/*.scss"]
    },
    rules: {
      property-sort-order: 0,
      indentation: 0,
      no-color-literals: 0,
      variable-name-format: 0,
      force-element-nesting: 0,
      no-qualifying-elements: 0,
      placeholder-in-extend: 0,
      nesting-depth: 0,
      leading-zero: 0,
      no-duplicate-properties: 0,
      no-vendor-prefixes: 0,
      force-pseudo-nesting: 0,
      pseudo-element: 0,
      no-important: 0,
      extends-before-declarations: 2,
      extends-before-mixins: 0,
      mixins-before-declarations: [
        2,
        {
          exclude: [
            "bp"
          ]
        }
      ],
      declarations-before-nesting: 2,
      class-name-format: 0,
      no-transition-all: 0,
      space-around-operator: 0,
      force-attribute-nesting: 0,
      no-ids: 0,
      no-misspelled-properties: 0
    }
  },
  postcss: {
    postcssPresetEnv: {
      autoprefixer: {},
      features: {}
    },
    postcssSortMediaQueries: {},
    cssnano: {
      preset: [
        default,
        {
          autoprefixer: {
            exclude: false
          },
          discardUnused: {
            exclude: false
          },
          mergeIdents: {
            exclude: false
          },
          reduceIdents: {
            exclude: false
          }
        }
      ]
    }
  },
  favicons: {
    paths: {
      src: "./images/favicon-source.png",
      dest: "./images/favicons/",
      templateFile: "html.html.twig",
      templateDir: "./templates/layout/"
    },
    config: {
      path: "/themes/custom/starterlight/images/favicons",
      appName: "Enter the name of the site or app here",
      appDescription: "Enter a short description of the site or app here",
      appleStatusBarStyle: "#fff",
      background: "#fff",
      theme_color: "#fff",
      display: "standalone",
      orientation: "portrait",
      start_url: "/?homescreen=1",
      version: 1.0,
      logging: false,
      html: "favicons.html",
      pipeHTML: true,
      replace: true,
      icons: {
        android: {
          offset: 10,
          background: true
        },
        appleIcon: {
          offset: 10,
          background: true
        },
        appleStartup: {
          offset: 10,
          background: true
        },
        coast: {
          offset: 10
        },
        favicons: true,
        firefox: {
          offset: 15,
          background: true,
          mask: true,
          overlayGlow: false
        },
        windows: {
          offset: 10,
          background: true
        },
        yandex: true
      }
    }
  },
  browserSync: {
    proxy: "local.dev",
    open: true
  }
}
```

### JSON
```
{
  "sass": {
    "sourcemaps": true,
    "paths": {
      "src": ["./scss/**/*.scss"],
      "dest": "./css/"
    },
    "config": {
      "outputStyle": "expanded"
    }
  },
  "js": {
    "paths": {
      "src": ["./js/**/*.js"]
    },
    "eslint": {}
  },
  "sassGlob": {},
  "sassLint": {
    "files": {
      "ignore": ["scss/00-base/settings/**/*.scss"]
    },
    "rules": {
      "property-sort-order": 0,
      "indentation": 0,
      "no-color-literals": 0,
      "variable-name-format": 0,
      "force-element-nesting": 0,
      "no-qualifying-elements": 0,
      "placeholder-in-extend": 0,
      "nesting-depth": 0,
      "leading-zero": 0,
      "no-duplicate-properties": 0,
      "no-vendor-prefixes": 0,
      "force-pseudo-nesting": 0,
      "pseudo-element": 0,
      "no-important": 0,
      "extends-before-declarations": 2,
      "extends-before-mixins": 0,
      "mixins-before-declarations": [
        2,
        {
          "exclude": [
            "bp"
          ]
        }
      ],
      "declarations-before-nesting": 2,
      "class-name-format": 0,
      "no-transition-all": 0,
      "space-around-operator": 0,
      "force-attribute-nesting": 0,
      "no-ids": 0,
      "no-misspelled-properties": 0
    }
  },
  "postcss": {
    "postcssPresetEnv": {
      "autoprefixer": {},
      "features": {}
    },
    "postcssSortMediaQueries": {},
    "cssnano": {
      "preset": [
        "default",
        {
          "autoprefixer": {
            "exclude": false
          },
          "discardUnused": {
            "exclude": false
          },
          "mergeIdents": {
            "exclude": false
          },
          "reduceIdents": {
            "exclude": false
          }
        }
      ]
    }
  },
  "favicons": {
    "paths": {
      "src": "./images/favicon-source.png",
      "dest": "./images/favicons/",
      "templateFile": "html.html.twig",
      "templateDir": "./templates/layout/"
    },
    "config": {
      "path": "/themes/custom/starterlight/images/favicons",
      "appName": "Enter the name of the site or app here",
      "appDescription": "Enter a short description of the site or app here",
      "appleStatusBarStyle": "#fff",
      "background": "#fff",
      "theme_color": "#fff",
      "display": "standalone",
      "orientation": "portrait",
      "start_url": "/?homescreen=1",
      "version": 1.0,
      "logging": false,
      "html": "favicons.html",
      "pipeHTML": true,
      "replace": true,
      "icons": {
        "android": {
          "offset": 10,
          "background": true
        },
        "appleIcon": {
          "offset": 10,
          "background": true
        },
        "appleStartup": {
          "offset": 10,
          "background": true
        },
        "coast": {
          "offset": 10
        },
        "favicons": true,
        "firefox": {
          "offset": 15,
          "background": true,
          "mask": true,
          "overlayGlow": false
        },
        "windows": {
          "offset": 10,
          "background": true
        },
        "yandex": true
      }
    }
  },
  "browserSync": {
    "proxy": "local.dev",
    "open": true
  }
}
```
