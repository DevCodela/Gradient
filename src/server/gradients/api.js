import Gradient from './model'

export const add = (req, res) => {
  if (req.user) {
    const {
      angle,
      colors
    } = req.body
    const gradient = new Gradient({
      angle,
      colors,
      user: req.user
    })
    gradient.save(error => {
      if (error) {
        return res.status(500).send('Ha ocurrido un error.')
      }
      return res.json({ success: true, gradient })
    })
  } else {
    return res.status(500).send('El usuario no existe.')
  }
}

export const list = (req, res) => {
  Gradient
    .find()
    .limit(50)
    .sort('-created')
    .then(list => {
      return res.json(list)
    })
    .catch(error => res.status(500).json({success: false}))
}
