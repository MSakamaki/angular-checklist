# Translation Guide

## Add languages

The following tasks are required to add a new language.
[See available code here](https://github.com/angular/angular/tree/master/packages/common/locales).
- Copy production into the configurations section of angular.json to create production build settings for the language.
- Add rewrites for the language to the `rewrites` of `firebase.json`.
- Add languages ​​to the languages ​​in `xliffmerge.json`.
- Let's make build environment for language in `build:ssr` in scripts of package.json.
- Register localeData of the language to be added to `app.module.ts` using `registerLocaleData()`.
https://angular.io/guide/i18n#i18n-pipes
- Add a language to the language selector of `src/app/shared/footer/footer.component.html`.

Hooray! Now you can choose a new language.

## Do translation

There are two types of translation: translation of the application using angular i18n and translation of the main content composed of markdown.

### Application translation

Please read the [angular i18n](https://angular.io/guide/i18n) documentation once.

Translate the app by editing `src/locale/messages.[language code].xlf`.
It is difficult to edit xlf file manually, so use something like a tool.

Tool Example: https://poedit.net/

### Translation of content

Translation of content is editing files in the `content` directory.

There are two types of files, copy the original and add the language code as follows:
Please translate the file which added the language code.

- .category ->.category. [language code]
- XXXXXX.md -> XXXXXX. [language code] .md

You don't have to make all the files at once. but when it's missing it will be displayed in original English.

## Reflect the translated content

See [CONTRIBUTING.md](https://github.com/angular-checklist/angular-checklist/blob/master/CONTRIBUTING.md).
