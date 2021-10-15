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

  console.log(highest)

  return highest
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}