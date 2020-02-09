exports.validator = {
  name: function(input) {
      if (!input)
          return 'username is required'
      const min = 3
      const max = 30
      if (input.length < min)
          return 'username min of length is ' + min
      if (input.length > max)
          return 'username max of length is ' + max
      return null
  },
  about: function(input) {
    if (!input)
        return 'username is required'
    const max = 220
    if (input.length > max)
        return 'username max of length is ' + max
    return null
  },
}