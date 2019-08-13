# Build Gatsby Theme

- [Building a Theme](https://www.gatsbyjs.org/tutorial/building-a-theme/)
- [Gatsby Theme Authoring](https://egghead.io/courses/gatsby-theme-authoring)

## Lesson 1 - Set up yarn workspaces

创建 site 和 gatsby-theme-events 两个目录，即 workspace，分别有自己的 package.json，根目录下还有自己的 package.json。

```shell
$ yarn workspaces info
$ yarn workspace site add gatsby react react-dom "gatsby-theme-events@*"
$ yarn workspace gatsby-theme-events add -P react react-dom gatsby
$ yarn workspace gatsby-theme-events add -D react react-dom gatsby
$ yarn workspace site develop
$ yarn workspace gatsby-theme-events develop
$ yarn workspaces info
```

## Lesson 2 - Add static data to a theme

在 gatsby-theme-events 下创建 data/events.yaml 文件。

安装 gatsby-source-filesystem 及 gatsby-transformer-yaml 来解析 yaml 文件。

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'data'
      }
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Event' // 用来方便 GraphQL 查询，相当于给这些 yaml 数据指定了一个别名，默认名字是文件名
      }
    }
  ]
}
```

typeName 的作用，如果不指定 typeName，GraphQL 查询时是这样查的：

```graphql
{
  allEventsYaml {
    ...
  }
}
```

query name 是文件的名字，指定 typeName 后是这样查询：

```graphql
{
  allEvent {
    ...
  }
}
```

运行 `yarn workspace gatsby-theme-events develop` 后打开 http://localhost:8001/___graphql 进行验证。

## Lesson 3 - Create a data directory using the onPreBootstrap lifecycle

当 gatsby-theme-events theme 发布时，很有可能并不会带上 data 目录，而是要求使用者在自己的项目中创建 data 目录并填充数据，如果使用者没有创建 data 目录，gatsby-source-filesystem 就会报错并终止。我们可以在 gatsby-node.js 中使用 onPreBootstrap lifecycle 方法来判断有没有 data 目录，如果没有就为用户创建此目录。

创建 gatsby-node.js 文件并实现 onPreBootstrap 方法：

```js
const fs = require('fs')

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data'

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}
```
