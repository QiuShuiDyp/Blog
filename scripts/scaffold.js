#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function printHelp() {
  console.log(`\n用法: blog-scaffold <command> [options]\n\n命令:\n  article    生成 Markdown 文章\n  project    基础项目 (Vite + Vue3 + TS)\n\n通用参数:\n  --name <name>             名称 (必填)\n  --dir <path>              目标目录 (默认: 当前目录)\n  --force                   如已存在则覆盖(谨慎)\n\n文章参数(article):\n  --category <name>         分类(会作为子目录)\n  --tags <a,b,c>            以逗号分隔的标签列表\n  --date <YYYY-MM-DD>       指定日期(默认今天)\n\n项目参数(project):\n  --template <name>         模板名称 (默认: vite-vue3-ts)\n\n示例:\n  blog-scaffold article --name "Unocss 入门" --category CSS --tags "CSS,工具"\n  blog-scaffold project --name my-app --dir ./playground\n`);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i += 1;
      }
    } else {
      args._.push(token);
    }
  }
  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function writeFileSafe(filePath, content, force) {
  if (fs.existsSync(filePath) && !force) {
    throw new Error(`文件已存在: ${filePath} (使用 --force 覆盖)`);
  }
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function createArticle(options) {
  const cwd = process.cwd();
  const title = options.name;
  if (!title) throw new Error('缺少 --name');
  const date = options.date || new Date().toISOString().slice(0, 10);
  const tags = (options.tags || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const baseDir = options.dir ? path.resolve(cwd, options.dir) : path.resolve(cwd, '技术文章');
  const targetDir = options.category
    ? path.join(baseDir, options.category)
    : baseDir;

  const fileName = `${date}-${slugify(title) || 'article'}.md`;
  const filePath = path.join(targetDir, fileName);

  const fmLines = [
    '---',
    `title: ${title}`,
    `date: ${date}`,
    ...(options.category ? [`category: ${options.category}`] : []),
    'tags:',
    ...(tags.length ? tags.map((t) => `  - ${t}`) : ['  - 未分类']),
    '---',
    '',
    `# ${title}`,
    '',
    '> 摘要：',
    '',
    '## 背景',
    '',
    '## 正文',
    '',
    '## 参考',
    '',
  ];

  writeFileSafe(filePath, fmLines.join('\n'), Boolean(options.force));
  console.log(`✅ 文章已创建: ${filePath}`);
}

function copyDir(src, dest, replacements, force) {
  if (!fs.existsSync(src)) throw new Error(`模板不存在: ${src}`);
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src)) {
      copyDir(path.join(src, entry), path.join(dest, entry), replacements, force);
    }
  } else {
    const ext = path.extname(src).toLowerCase();
    const textLike = ['.json', '.md', '.ts', '.tsx', '.js', '.jsx', '.vue', '.html', '.css'];
    let content = fs.readFileSync(src);
    if (textLike.includes(ext)) {
      let text = content.toString('utf8');
      Object.entries(replacements || {}).forEach(([key, value]) => {
        const re = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        text = text.replace(re, value);
      });
      writeFileSafe(dest, text, force);
    } else {
      if (fs.existsSync(dest) && !force) {
        throw new Error(`文件已存在: ${dest} (使用 --force 覆盖)`);
      }
      ensureDir(path.dirname(dest));
      fs.copyFileSync(src, dest);
    }
  }
}

function createProject(options) {
  const cwd = process.cwd();
  const name = options.name;
  if (!name) throw new Error('缺少 --name');
  const dir = options.dir ? path.resolve(cwd, options.dir) : cwd;
  const targetDir = path.join(dir, name);
  const templateName = options.template || 'vite-vue3-ts';
  const templateDir = path.resolve(__dirname, '../templates', templateName);

  copyDir(templateDir, targetDir, { '__APP_NAME__': name }, Boolean(options.force));
  console.log(`✅ 项目已创建: ${targetDir}`);
  console.log('下一步:');
  console.log(`  cd ${path.relative(cwd, targetDir) || '.'}`);
  console.log('  npm install');
  console.log('  npm run dev');
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || ['-h', '--help', 'help'].includes(argv[0])) {
    printHelp();
    process.exit(0);
  }
  const command = argv[0];
  const options = parseArgs(argv.slice(1));
  try {
    if (command === 'article') {
      createArticle(options);
    } else if (command === 'project') {
      createProject(options);
    } else {
      console.error(`未知命令: ${command}`);
      printHelp();
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ 错误:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}


