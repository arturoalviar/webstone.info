// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Webstone.info',
  siteDescription: "Just another page built with gridsome",
  permalinks : {
    trailingSlash: false 
  },
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          whitelist: ['svg-inline--fa', 'table', 'table-striped', 'table-bordered', 'table-hover', 'table-sm'],
          whitelistPatterns: [/fa-$/, /blockquote$/, /code$/, /pre$/, /table$/, /table-$/, /vueperslide$/, /vueperslide-$/]
        },
        presetEnvConfig: {},
        shouldPurge: false,
        shouldImport: true,
        shouldTimeTravel: true,
        shouldPurgeUnusedKeyframes: true,
      }
    },
    {
      use: 'gridsome-source-static-meta',
      options: {
        path: 'content/site/*.json'
      }
    },
    {
      use: 'gridsome-source-menu',
      options: {
        path: './content/documentation/**/sidebar.json'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Repository',
        path: './content/repositories/*.md'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Documentation',
        path: './content/documentation/**/*.md',
        refs: {
          repository: 'Repository'
        }
      }
    },
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     typeName: 'Author',
    //     path: './content/author/*.md'
    //   }
    // },
    
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     typeName: 'Blog',
    //     path: './content/blog/**/*.md',
    //     refs: {
    //       author: 'Author',
    //       tags: {
    //         typeName: 'Tag',
    //         create: true
    //       }
    //     }
    //   }
    // },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'CustomPage',
        path: './content/pages/*.md'
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        searchFields: ['title', 'content'],
        collections: [{
          typeName: 'Documentation',
          indexName: 'Documentation',
          fields: ['title', 'repository', 'content']
        }]
      }
    }
  ],
  transformers: {
    remark: {
      plugins: [
        'remark-autolink-headings',
        'remark-attr',
        ['gridsome-plugin-remark-codetitle', {
          className: 'codeblock-title'
        }],
        ['gridsome-plugin-remark-prismjs-all', {
          noInlineHighlight: false,
          showLineNumbers: false,
        }],
        require('./packages/gridsome-plugin-remark-figure'),
        '@noxify/gridsome-remark-table-align',
        [ '@noxify/gridsome-remark-classes', {
          'table': 'table table-striped my-4',
          'tableCell[align=center]': 'text-center',
          'tableCell[align=right]': 'text-right'
        } ]
      ],
      
      processImages: false
      
    }
  },
  templates: {
    /*Blog: [{
      path: '/posts/:title'
    }],*/
    CustomPage: [{
      path: '/:title',
      component: '~/templates/CustomPage.vue'
    }],
    /*Author: [{
      path: '/author/:name',
      component: '~/templates/Author.vue'
    }],
    Tag: [{
      path: '/tags/:title',
      component: '~/templates/Tag.vue'
    }]*/
  },
  chainWebpack: config => {
      config.resolve.alias.set('@pageImage', '@/assets/images');
  }
}