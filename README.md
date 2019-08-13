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
