const Generator = require('yeoman-generator');
const path = require('path')
const fs = require('fs');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.log('Initializing app generators..')
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type    : 'input',
                name    : 'appName',
                message : 'your app name: ',
                default : 'myApp'
            },
            {
                type    : 'input',
                name    : 'appVersion',
                message : 'version: ',
                default : '1.0.0'
            },
            {
                type    : 'input',
                name    : 'appDescription',
                message : 'description: '
            },
            {
                type    : 'input',
                name    : 'entryPoint',
                message : 'entry point: ',
                default : 'lib/index.js'
            },
            {
                type    : 'input',
                name    : 'authorName',
                message : 'author name: '
            },
            {
                type    : 'input',
                name    : 'authorEmail',
                message : 'author email: '
            }
        ])
    }

    copyingFiles() {
        let files = fs.readdirSync(path.resolve(__dirname, this.templatePath()));
        // const folder = __dirname.split('\\').pop()
        // this.log(`files from folder ${folder} to copy: `)
        this.log(files)
        for (let fileName of files) {
            this.fs.copyTpl(
                this.templatePath(fileName),
                this.destinationPath(path.resolve(fileName)),
                this.answers
            );
        }
        // this.log(`successfully copied files from ${folder}.`)
    }
};
