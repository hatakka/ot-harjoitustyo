const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)  {
    return NaN
  }

  let highest = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  }, { likes: 0 })

  return highest
}


const authorStats = (blogs) => {
  if (blogs.length === 0)  {
    return []
  }

  let authorNames = []

  let authorBlogs = blogs.reduce((authors, blog) => {
    if (!authors[blog.author]) {
      authorNames.push(blog.author)
      authors[blog.author] = { 'author' : blog.author, 'blogs' : 1, 'likes' : blog.likes  }
    } else {
      authors[blog.author].blogs++
      authors[blog.author].likes += blog.likes
    }
    return authors
  }, [])

  let stats = authorNames.reduce((statArray, name) => {
    statArray.push(authorBlogs[name])
    return statArray
  }, [])

  return stats
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)  {
    return NaN
  }

  let authorBlogs = authorStats(blogs)

  let maxBlogs = authorBlogs.reduce((max, author) => {
    return author.blogs > max.blogs ? { 'author' : author.author, 'blogs' : author.blogs } : max
  }, { blogs: 0 })

//  console.log(maxBlogs)

  return maxBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)  {
    return NaN
  }

  let authorLikes = authorStats(blogs)

//  console.log(authorLikes)

  let maxLikes = authorLikes.reduce((max, author) => {
    return author.likes > max.likes ? { 'author' : author.author, 'likes' : author.likes } : max
  }, { likes: 0 })

//  console.log(maxLikes)

  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}