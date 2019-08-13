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
