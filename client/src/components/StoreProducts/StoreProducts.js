import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Tween } from 'react-gsap';

import './storeProducts.scss';
import { addToCart } from '../../utils/functions';
import DetailsPage from '../DetailsPage/DetailsPage';
import Spinner from '../Spinner/Spinner';
import CartNotification from '../CartNotification/CartNotification';

class StoreProducts extends Component {
  constructor(props) {
    super(props);
    this.notification = false;
    this.state = {
      categories: [],
      currentPage: this.props.query.page ? +this.props.query.page : 1,
      // Url string query
      query: {
        ...this.props.query,
        category: this.props.query.category ? this.props.query.category : 'all'
      }
    };
    this.addItemToCart = this.addItemToCart.bind(this);
    this.showDetailsPage = this.showDetailsPage.bind(this);
    this.closeDetailsPage = this.closeDetailsPage.bind(this);
  }
  // Generates list of categories, category side-menu
  generateCategoriesList() {
    return (
      <ul className="store-categories-grid">
        <li className="categories-title">Categories:</li>
        <Link
          className="category-list-items"
          to={{
            pathname: '/store',
            search: '?category=all&page=1'
          }}
          onClick={async () => {
            await this.setState({
              currentPage: 1,
              query: { ...this.state.query, category: 'all' }
            });
            this.fetchProducts();
          }}
        >
          All products
        </Link>
        {this.state.categories.map((item, i) => {
          return (
            // prettier-ignore
            <Link
              to={{
                pathname: '/store',
                search: `?category=${this.state.categories[i].name}&page=1`
              }}
              key={i}
              className="category-list-items"
              onClick={async () => {
                  await this.setState({
                    currentPage: 1,
                    query: { ...this.state.query, category: this.state.categories[i].name }
                  })
                  this.fetchProducts(this.state.categories[i].name)
                }
              }
            >
              {this.state.categories[i].name}
            </Link>
          );
        })}
      </ul>
    );
  }
  async addItemToCart(productId) {
    // notification set to true will trigger this.showNotification()
    this.notification = true;
    // Imported function, adds to cart and returns updated cart size
    const cartSize = await addToCart(productId);
    this.props.updateCartSize(cartSize);
  }
  // Generating grid of products
  generateProducts() {
    const { products } = this.state;
    return (
      <>
        <ul className="store-products-grid">
          {products.map((item, i) => {
            return (
              <li key={i}>
                <div className="products-info">
                  <div className="products-info-overlay">
                    <button
                      className="details-btn"
                      onClick={() => this.showDetailsPage(products[i]._id)}
                    >
                      Details
                    </button>
                  </div>
                  <img className="products-info-image" src={products[i].imageUrl} alt="img" />
                  <div className="products-info-text">
                    <p className="products-info-name">{products[i].name}</p>
                    <p className="products-info-price">{products[i].price}$</p>
                    <button onClick={() => this.addItemToCart(products[i]._id)}>Add to cart</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {this.pagination()}
      </>
    );
  }
  // Pagination logic
  pagination() {
    const { currentPage, lastPage, query } = this.state;
    return (
      <ul className="pagination">
        {currentPage > 1 && (
          <li>
            {/* Left arrow */}
            <Link
              to={{
                pathname: '/store',
                search: `?category=${query.category}&page=${currentPage > 1 ? currentPage - 1 : 1}`
              }}
              onClick={async () => {
                // Prevents setting the current page to less than 1 with left arrow
                await this.setState({ currentPage: currentPage > 2 ? currentPage - 1 : 1 });
                this.fetchProducts(query.category);
                window.scrollTo(0, 0);
              }}
            >
              <i className="fas fa-chevron-left" />
            </Link>
          </li>
        )}
        {currentPage > 1 ? (
          // Styling if the current page is > 1
          <>
            <li>
              <Link
                to={{
                  pathname: '/store',
                  search: `?category=${query.category}&page=${currentPage - 1}`
                }}
                onClick={async () => {
                  await this.setState({ currentPage: currentPage - 1 });
                  this.fetchProducts(query.category);
                  window.scrollTo(0, 0);
                }}
              >
                {currentPage - 1}
              </Link>
            </li>
            <li className="currentPage">{currentPage}</li>

            {currentPage < lastPage && (
              <li>
                <Link
                  to={{
                    pathname: '/store',
                    // prettier-ignore
                    search: `?category=${query.category}&page=${currentPage + 1}`
                  }}
                  onClick={async () => {
                    await this.setState({ currentPage: currentPage + 1 });
                    this.fetchProducts(query.category);
                    window.scrollTo(0, 0);
                  }}
                >
                  {currentPage + 1}
                </Link>
              </li>
            )}
          </>
        ) : (
          // Styling if the current page is === 1
          <>
            <li className="currentPage">1</li>
            {currentPage < lastPage && (
              <li>
                <Link
                  to={{
                    pathname: '/store',
                    search: `?category=${query.category}&page=2`
                  }}
                  onClick={async () => {
                    await this.setState({ currentPage: 2 });
                    this.fetchProducts(query.category);
                    window.scrollTo(0, 0);
                  }}
                >
                  {currentPage + 1}
                </Link>
              </li>
            )}
            {currentPage + 1 < lastPage && (
              <li>
                <Link
                  to={{
                    pathname: '/store',
                    search: `?category=${query.category}&page=3`
                  }}
                  onClick={async () => {
                    await this.setState({ currentPage: 3 });
                    this.fetchProducts(query.category);
                    window.scrollTo(0, 0);
                  }}
                >
                  {currentPage + 2}
                </Link>
              </li>
            )}
          </>
        )}
        {currentPage < lastPage && (
          <li>
            {/* Right arrow */}
            <Link
              to={{
                pathname: '/store',
                search: `?category=${query.category}&page=${currentPage + 1}`
              }}
              onClick={async () => {
                await this.setState({ currentPage: currentPage + 1 });
                this.fetchProducts(query.category);
                window.scrollTo(0, 0);
              }}
            >
              <i className="fas fa-chevron-right" />
            </Link>
          </li>
        )}
      </ul>
    );
  }

  fetchProducts(category) {
    if (category && category !== 'all') {
      // Fetch one category of products
      axios
        .get(`http://localhost:8080/category/${category}?page=${this.state.currentPage}`)
        .then(result => {
          this.setState({
            products: result.data.products ? result.data.products : [],
            lastPage: result.data.lastPage
          });
        })
        .catch(err => console.log(err));
    } else {
      // Fetch all products if the category isn't set
      axios.get(`http://localhost:8080/product?page=${this.state.currentPage}`).then(result => {
        this.setState({
          products: result.data.products,
          lastPage: result.data.lastPage
        });
      });
    }
  }
  // Displays product details modal
  showDetailsPage(productId) {
    this.props.history.push({
      pathname: '/store',
      search: `?productId=${productId}`
    });
    this.setState({
      query: { productId }
    });
  }
  // Closes product details modal
  closeDetailsPage() {
    this.props.history.push('/store');
    this.setState({
      query: { productId: null }
    });
  }
  // Shows 'Added to cart' notification
  showNotification() {
    this.notification = false;
    return <CartNotification />;
  }
  componentDidMount() {
    // Get the category names
    axios
      .get('http://localhost:8080/category')
      .then(res => {
        this.setState({
          categories: res.data
        });
      })
      .catch(err => console.log(err));
    this.fetchProducts(this.state.query.category);
  }

  render() {
    return (
      <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={1} delay={0.5}>
        {this.state.products && this.state.categories ? (
          <div className="store-grid">
            {/* If this.notification inside this.addToCart() is set to true, show notification */}
            {this.notification && this.showNotification()}
            <>
              <div className="store-categories">{this.generateCategoriesList()}</div>
              <div className="store-products">{this.generateProducts()}</div>
              {this.state.query.productId && (
                <DetailsPage
                  productId={this.state.query.productId}
                  close={this.closeDetailsPage}
                  updateCartSize={this.props.updateCartSize}
                />
              )}
            </>
          </div>
        ) : (
          <div className="store-fetching">
            <p>Fetching products...</p>
            <Spinner />
          </div>
        )}
      </Tween>
    );
  }
}

export default withRouter(StoreProducts); // HOC needed to modify url query strings
