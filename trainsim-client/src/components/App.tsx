import React, { Component, ReactElement } from "react";
import GoogleLoginField from "./GoogleLoginField";
import HomePage from "./HomePage";
import Cart from "../models/Cart";
import { AppContext } from "../contexts/AppContext";
import { CartButton } from "./CartButton";

interface AppState {
    currentPage: ReactElement;
    cart: Cart;
}

export default class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.setPage = this.setPage.bind(this);
        App.contextType = AppContext;

        this.state = { currentPage: <HomePage setPage={this.setPage} />, cart: new Cart() };
    }

    setPage(page: ReactElement) {
        this.setState({ currentPage: page });
        window.scrollTo(0, 0);
    }

    override render() {
        return <section className="section mt-1 pt-1">
            <AppContext.Provider value={{ cart: this.state.cart, updateContext: cart => { this.setState({cart: cart}) } }}>
                <div className="container is-max-widescreen">
                    <nav aria-label="main navigation" className="navbar is-white mt-5 mb-5" role="navigation">
                        <div className="navbar-brand">
                            <a className="navbar-item has-text-weight-bold" href="/">
                                <span>trainsim</span>
                            </a>
                        </div>
                        <div className="navbar-menu" id="navbar">
                            <div className="navbar-end">
                                <CartButton cart={this.state.cart} />
                                <GoogleLoginField />
                            </div>
                        </div>
                    </nav>
                    {this.state.currentPage}
                    <footer className="footer has-background-white">
                        <nav className="level">
                            <div className="level-left">
                                <small className="level-item"><a className="has-text-dark" href="/">trainsim</a></small>
                                <small className="level-item">&copy; {new Date().getFullYear()}</small>

                            </div>
                            <div className="level-right">
                                <small className="level-item"><a className="has-text-dark" href="#">Privacy</a></small>
                                <small className="level-item"><a className="has-text-dark" href="#">FAQs</a></small>
                                <small className="level-item"><a className="has-text-dark" href="#">Support</a></small>
                            </div>
                        </nav>
                    </footer>
                </div>
            </AppContext.Provider>
        </section>;
    }
}