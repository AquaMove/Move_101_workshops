export default {
  logo: <span>Move 101 Workshops</span>,
  project: {
    link: 'https://github.com/AquaMove/Move_101_workshops',
  },
  docsRepositoryBase: 'https://github.com/AquaMove/Move_101_workshops',
  darkMode: false, 
  footer: {
    text: 'Move 101 Workshops Documentation',
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Move 101 Workshops" />
      <meta property="og:description" content="Learn Sui Move development from basics to advanced patterns" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s - Move 101'
    }
  },
  primaryHue: 210,
  primarySaturation: 100,
  toc: {
    float: true,
    title: "On This Page",
  },
  sidebar: {
    titleComponent: ({ title, type }) => {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/AquaMove/Move_101_workshops" target="_blank">
          Move 101 Workshops
        </a>
        .
      </span>
    )
  }
}
