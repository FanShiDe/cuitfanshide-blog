const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const figlet = require('figlet');
const moment = require('moment');
const pinyin = require('pinyin');
const rewritePattern = require('regexpu-core');
const BLOG_TYPES = ['前端', 'NodeJS'];

const questions = [
  {
    type: 'input',
    name: 'title',
    default: '我的第一篇文章',
    message: '🤔  第一问：文章的标题？'
  },
  {
    type: 'input',
    name: 'author',
    default: '尊姓网名',
    message: '🤔  第二问：请献上尊姓网名？'
  },
  {
    type: 'list',
    name: 'subTitle',
    default: '前端',
    message: '🤔  第三问：文章的分类是什么？（请选择）',
    choices: BLOG_TYPES
  }
];

figlet('cuitFanshide', (err, data) => {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(chalk.cyan(data));
  console.log();

  inquirer.prompt(questions).then(answers => {
    const { title, author, subTitle } = answers;
    const today = moment().format('YYYY-MM-DD');

    const cnPattern = rewritePattern('\\p{Unified_Ideograph}', 'u', {
      unicodePropertyEscape: true,
      useUnicodeFlag: true
    });
    const pattern = `[^${cnPattern.slice(1, -1)}^a-z^A-Z^0-9^]`;
    const re = new RegExp(pattern, 'gu');
    const thisPath = pinyin(title.replace(re, ''), {
      style: pinyin.STYLE_NORMAL
    }).reduce(
      (p, c, index, arr) =>
        p.concat(index === arr.length - 1 ? c[0] : `${c[0]}-`),
      ''
    );

    console.log(thisPath);
    const targetTitle = pinyin(title.replace(re, ''), {
      style: pinyin.STYLE_NORMAL
    }).reduce((p, c) => p.concat(`-${c[0].toLowerCase()}`), '');

    const folderName = `./content/posts/${today}${targetTitle}`;
    if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);

    const data = `---
title: ${title}
date: "${moment().format()}"
publish: true
path: "/${thisPath}/"
author: ${author}
cover: "./header.jpg"
subTitle: ${subTitle}
---

![${title}](./header.jpg)

`;
    fs.writeFileSync(`${folderName}/index.md`, data);
    fs.copyFileSync('./scripts/header.jpg', `${folderName}/header.jpg`, 'w');

    console.log();
    console.log('👌  文章的信息已了解，系统已为您生成好了以下文件：');
    console.log();
    console.log(`${chalk.green('  已创建')} ${folderName}/index.md`);
    console.log(`${chalk.green('  已创建')} ${folderName}/header.jpg`);
    console.log();
    console.log(
      chalk.yellow(
        '⚠️  注意：header.jpg 是默认的图片，请及时更新该文件，图片尺寸为 1200 * 600，单位是 px。'
      )
    );
    console.log(chalk.yellow('   翻译类文章请在文章开始处写上原文链接。'));
    console.log();
    console.log('现在可以使用编辑器打开文件开始你的文章写作，比如：');
    console.log(chalk.cyan(`  vim ${folderName}/index.md`));
    console.log();
    console.log('❤️  cuitFanshide');
    console.log();
  });
});
