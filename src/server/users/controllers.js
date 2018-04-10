export const logout = (req, res) => {
  req.logout()
  return res.redirect('/')
}
