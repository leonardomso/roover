export default {
  repository: 'https://github.com/leonardomso/roover',
  docsRepository: 'https://github.com/leonardomso/roover',
  branch: 'master',
  path: '/',
  titleSuffix: ' – Roover',
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null,
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Leonardo Maldonado.`,
  footerEditOnGitHubLink: true,
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">Roover</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Manage audio in React with ease
      </span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Roover – Manage audio in React with ease"
      />
      <meta
        name="og:title"
        content="Roover – Manage audio in React with ease"
      />
    </>
  ),
};
