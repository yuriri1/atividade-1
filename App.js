import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import homePage from './homePage'
import eventPage from './eventPage'

const MainNavigation = createStackNavigator({
  Home: {screen: homePage},
  Event: {screen: eventPage}
})

const app = createAppContainer(MainNavigation)
export default app