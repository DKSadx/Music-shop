import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Tween } from 'react-gsap';
import './storeProducts.scss';
import { addToCart } from '../../utils/functions';

export default class StoreProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currentPage: this.props.query.page ? +this.props.query.page : 1,
      query: {
        ...this.props.query,
        category: this.props.query.category ? this.props.query.category : 'all'
      }
    };
  }

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

  generateProducts() {
    const products = this.state.products;
    return (
      <>
        <ul className="store-products-grid">
          {products.map((item, i) => {
            return (
              <li key={i}>
                <a>
                  <div className="products-info">
                    <div className="products-info-overlay">{/* <p>{products[i]._id}</p> */}</div>
                    <img src={products[i].imageUrl} alt="img" />
                    <div className="products-info-text">
                      <p className="products-info-name">{products[i].name}</p>
                      <p className="products-info-price">{products[i].price}$</p>
                      <button onClick={() => addToCart(products[i]._id)}>Add to cart</button>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        {this.pagination()}
      </>
    );
  }
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
                await this.fetchProducts(query.category);
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
      <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={2} delay={0.5}>
        <div className="store-grid">
          {this.state.products && this.state.categories && (
            <>
              <div className="store-categories">{this.generateCategoriesList()}</div>
              <div className="store-products">{this.generateProducts()}</div>
            </>
          )}
        </div>
      </Tween>
    );
  }
}
