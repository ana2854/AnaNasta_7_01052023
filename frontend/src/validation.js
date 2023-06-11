export function checkEmail(email) {
  const errors = []

  if (email.length === 0) {
    errors.push("Champs obligatoire")
  }

  if (!email.endsWith("@groupomania.com")) {
    errors.push("Entrez un email se terminant par @groupomania.com")
  }

  return errors
}

export function checkPassword(password) {
  const errors = []

  if (password.length === 0) {
    errors.push("Champs obligatoire")
  }


  if (password.length < 5) {
    errors.push("Veuillez saisir au moins 5 caractères")
  }

  if (!password.match(/[a-z]/)) {
    errors.push("Veuillez saisir une lettre minuscule")
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("Veuillez saisir une lettre majuscule")
  }

  if (!password.match(/[0-9]/)) {
    errors.push("Veuillez saisir un chiffre")
  }

  return errors
}
