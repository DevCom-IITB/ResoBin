import axios from 'axios';

const baseUrl = 'https://api.github.com/repos/arya2331/ResoBin/contributors';
const ignoredContributors = ['ImgBotApp']

const getContributors = async () => axios.get(baseUrl)
  .then((response) =>
    response.data.filter(
      (contributor) => contributor.type === 'User' && !ignoredContributors.has(contributor.login),
    ),
  );

export default getContributors
