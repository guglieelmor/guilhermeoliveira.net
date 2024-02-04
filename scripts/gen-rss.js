const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const feed = new RSS({
    title: 'Guilherme Oliveira - Portfolio',
    site_url: 'https://guilhermeoliveira.net',
    feed_url: 'https://guilhermeoliveira.net/feed.xml'
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'pages'))
  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.')) return

      await fs.readFile(
        path.join(__dirname, '..', 'pages', name)
      )

    })
  ) 
  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
