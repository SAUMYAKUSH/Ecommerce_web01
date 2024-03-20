import React, { useState, useContext, lazy, Suspense } from "react";
import Store from "./Pages/Store";
import NavBar from "./components/Navbar/Navbar";
import Cart from "./components/cart/Cart";
import CartProvider from "./store/CartProvider";
//import { createBrowserRouter, RouterProvider } from 'react-router-dom'; we are not using react-bootstrap@6
import { Route, Switch, Redirect } from "react-router-dom/cjs/react-router-dom.min"; //we now using version 5 of react-bootsrap
// import About from "./Pages/About";
// import HomePage from "./Pages/HomePage";
// import Movies from "./components/movie/Movies";
// import ProductDetail from "./Pages/ProductDetail";
// import ContactUs from "./Pages/ContactUs";
import AuthForm from "./Pages/AuthForm";
import AuthContext from "./store/auth-context";

const About = lazy(() => import("./Pages/About"));//lazy loading we use jb hme suppose about page tb hi dikhana h jb uspe click ho ni to apne aap render ni krwana like we used memoization and suspense loads data then after show
const HomePage = lazy(() => import("./Pages/HomePage"));
const Movies = lazy(() => import("./components/movie/Movies"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));

const App = () => {
  const [cartShown, setCartShown] = useState(false);

  const authCxt = useContext(AuthContext);

  // const router = createBrowserRouter([
  //   {path: '/', element: <HomePage/>},
  //   {path: '/About', element: <About/>},
  //   {path: '/Store', element: <List/>}
  // ]);

  const showCartHandler = () => {
    setCartShown(true);
  };
  const hideCartHandler = () => {
    setCartShown(false);
  };

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-bootsrap-ecom-fetch-api-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const contactFormHandler = async (userIssue) => {
    const response = await fetch(
      "https://react-bootsrap-ecom-fetch-api-default-rtdb.firebaseio.com/issues.json",
      {
        method: "POST",
        body: JSON.stringify(userIssue),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <CartProvider>
        <NavBar onShowCart={showCartHandler} />
        {cartShown && <Cart onHideCart={hideCartHandler} />}
        <Switch>
          <Route exact path="/">
            {authCxt.isLoggedIn && (
              <Suspense fallback={<p>Loading...</p>}>
                <HomePage />
              </Suspense>
            )}
            {!authCxt.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/Store/:productId">
            {authCxt.isLoggedIn && (
              <Suspense fallback={<p>Loading...</p>}>
                <ProductDetail />
              </Suspense>
            )}
            {!authCxt.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/Store">
            {authCxt.isLoggedIn && <Store  onShowCart={showCartHandler} />}
            {!authCxt.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/Movie">
            {authCxt.isLoggedIn && (
              <Suspense fallback={<p>Loading...</p>}>
                <Movies onAddMovie={addMovieHandler} />
              </Suspense>
            )}
            {!authCxt.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/About">
            {authCxt.isLoggedIn && (
              <Suspense fallback={<p>Loading...</p>}>
                <About />
              </Suspense>
            )}
            {!authCxt.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/Contact">
            {authCxt.isLoggedIn && (
              <Suspense fallback={<p>Loading...</p>}>
                <ContactUs contactFormHandler={contactFormHandler} />
              </Suspense>
            )}
            {!authCxt.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          {!authCxt.isLoggedIn && (
            <Route path="/auth">
              <AuthForm />
            </Route>
          )}
          {/* <Route path="/Store" component={List} /> if above Route syntax not work so we can use like this*/}
        </Switch>
      </CartProvider>
    </>
  );
};

export default App;
