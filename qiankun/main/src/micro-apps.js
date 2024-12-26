import MarkdownContainer from '@/components/markdownContainer'

const shareReactComponent = {
  MarkdownContainer
}

const microApps = [
  {
    name: 'sub-vue2',
    entry: '//localhost:5201/',
    activeRule: '/sub-vue2',
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: '/sub-vue2' // 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
    }
  },
  {
    name: 'sub-vue3',
    entry: '//localhost:5202/',
    activeRule: '/sub-vue3',
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: '/sub-vue3' // 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
    }
  },
  {
    name: 'sub-react',
    entry: '//localhost:5203/',
    activeRule: '/sub-react',
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: '/sub-react',
      ...shareReactComponent
    }
  }
]

export default microApps