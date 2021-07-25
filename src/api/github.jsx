import axios from 'axios'

import { toastError } from 'components/toast'

const baseUrl = 'https://api.github.com/repos/arya2331/ResoBin/contributors'
const ignoredContributors = ['ImgBotApp']

const getContributors = async () => {
  return axios
    .get(baseUrl)
    .then((response) =>
      response.data.filter(
        (contributor) =>
          contributor.type === 'User' &&
          !ignoredContributors.includes(contributor.login)
      )
    )
    .catch((error) => toastError(error.message))
}

export default getContributors
