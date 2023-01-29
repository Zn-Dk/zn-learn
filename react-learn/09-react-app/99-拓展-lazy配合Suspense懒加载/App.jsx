import { Component, lazy, Suspense } from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";

// import About from "./pages/About";
// import Home from "./pages/Home";
// 懒加载实现
import Loading from "./components/Loading";
const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>拓展 lazy 懒加载配合 Suspense </h1>
        <div className="wrap">
          <ul>
            <NavLink to="/about">
              <li>About</li>
            </NavLink>
            <NavLink to="/home">
              <li>Home</li>
            </NavLink>
          </ul>
          <div>
            {/* Suspense 组件搭配 lazy API 实现懒加载,
                fallback 为必传(作 Loading/骨架屏非懒加载的一般组件)
            */}
            <Suspense fallback={<Loading />}>
              <Route
                path="/about"
                component={About}
              />
              <Route
                path="/home"
                component={Home}
              />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}
