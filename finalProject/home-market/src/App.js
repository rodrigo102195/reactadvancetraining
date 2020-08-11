import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import Home from "./templates/Home/Home";
import Login from "./templates/Login/Login";
import Register from "./templates/Register/Register"
import ForgotPassword from "./templates/ForgotPassword/ForgotPassword";
import Catalog from "./templates/Catalog/Catalog";
import Purchase from "./templates/Purchase/Purchase";
import EditProfile from "./templates/EditProfile/EditProfile";
import Search from "./templates/Search/Search";
import "./App.scss";
import  PrivateRoute  from "./route/PrivateRoute";
import headerImage from "./assets/background.png";
import logo from "./assets/logo-white.png";
import configureStore from "./store";
import ProviderIntlStore from "./Components/ProviderIntlStore/ProviderIntlStore";
import Favourites from "./templates/Favourites/Favourites";
import Offers from "./templates/Offers/Offers";

const App = () => {
  const store = configureStore();
  const icons = ["twitter", "facebook f", "instagram", "mail"];

  return (
    <Provider store={store}>
    <ProviderIntlStore>
      <div className="App">
        <header className="App__header">
          <img src={logo} alt="logo" className="App__logo" />
          <img src={headerImage} alt="fruits" className="App__headerImage" />
        </header>
        <main>
          <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/forgotPassword" exact component={ForgotPassword} />
            <PrivateRoute path="/editProfile" exact component={EditProfile} />
            <PrivateRoute path="/catalog" exact component={Catalog} />
            <PrivateRoute path="/purchase" exact component={Purchase} />
            <PrivateRoute path="/search" exact component={Search} />
            <PrivateRoute path="/favourites" exact component={Favourites} />
            <PrivateRoute path="/offers" exact component={Offers} />
          </BrowserRouter>
        </main>
        <footer className="App__footer">
          <div className="App__footerMedia">
            {icons.map((icon, index) => (
              <Icon
                className="socialIcon"
                circular
                inverted
                name={icon}
                size="small"
                key={index}
              />
            ))}
          </div>
          <p className="App__footerText">
            <FormattedMessage id="footer.text" />
          </p>
        </footer>
      </div>
    </ProviderIntlStore>
    </Provider>
  );
};

export default App;
