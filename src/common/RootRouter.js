import React from "react"
import { Router, Route, IndexRoute, browserHistory } from "react-router"
import UserContainer from "../containers/User"
import LayoutContainer from "../containers/Layout"
import { getItem } from "../helpers/localStorage"

export default class RootRouter extends React.PureComponent {
  isAuth = async () => {
    try {
      const user = await getItem("user")
      if (!user) throw new Error("User is undefined!")
    } catch (err) {
      console.error(err.message)
      browserHistory.push("/")
    }
  }
  
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute component={UserContainer} />
          <Route path="user" component={UserContainer} />
          <Route path="notes" onEnter={this.isAuth} component={LayoutContainer} />
        </Route>
      </Router>
    )
  }
}