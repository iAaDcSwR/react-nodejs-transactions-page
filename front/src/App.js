import './App.css';
import NavTop from './components/NavTop';
import FunFact from './components/FunFact';
import NavSide from './components/NavSide';
import * as React from 'react';
import NumberFormat from 'react-number-format';

class App extends React.Component {
  constructor(props) {
    super(props);

    /**
     * @typedef {{
     * date: Date;
     * name: string;
     * ismobile: boolean;
     * payment: string;
     * bin: string;
     * amount: number;
     * transid: string;
     * isapproved: boolean;
     * email: string;
     * }} Transaction
     */

    /**
     * @type {{
     * transactions: Transaction[];
     * total: number;
     * approved: number;
     * declined: number;
     * approvalRate: number;
     * totalResults: number;
     * pageNum: number;
     * pageSize: number;
     * }}
     */
    this.state = {
      transactions: [],
      total: 0,
      approved: 0,
      declined: 0,
      approvalRate: 0,
      totalResults: 0,
      pageNum: 0,
      pageSize: 5
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.searchTransactions = this.searchTransactions.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  /** @param {Event} event */
  handleChange(event) {
    const target = event.target;
    const value = /* target.type === 'checkbox' ? target.checked :  */ target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /** @param {Event} event */
  handlePageSizeChange(event) {
    return this.searchTransactions(0, event.target.value);
  }

  /** @param {Event} event */
  handleSubmit(event) {
    event.preventDefault();
    return this.searchTransactions(0);
  }

  previousPage() {
    var pageNum = this.state.pageNum - 1;
    return this.searchTransactions(pageNum);
  }

  nextPage() {
    var pageNum = this.state.pageNum + 1;
    return this.searchTransactions(pageNum);
  }


  /** @param {number} [pageNum] */
  /** @param {number} [pageSize] */
  searchTransactions(pageNum, pageSize) {
    var newState = {};
    if (pageNum != null) newState.pageNum = pageNum;
    if (pageSize != null) newState.pageSize = pageSize;
    this.setState(newState);

    const body = {
      transid: this.state.transid || null,
      isapproved: this.state.isapproved,
      payment: this.state.payment || null,
      min: parseFloat(this.state.min) || null,
      max: parseFloat(this.state.max) || null,
      bin: this.state.bin || null,
      email: this.stateemail || null,
      pageNum: (pageNum == null ? this.state.pageNum : pageNum) || 0,
      pageSize: parseInt(pageSize == null ? this.state.pageSize : pageSize) || 5,
    }

    switch (body.isapproved) {
      case "true":
        body.isapproved = true;
        break;

      case "false":
        body.isapproved = false;
        break;

      default:
        body.isapproved = null;
        break;
    }

    return fetch('http://localhost:3000/api/transactions/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => this.setState({ transactions: data.result, totalResults: data.total }))
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }


  getStats() {
    return fetch('http://localhost:3000/api/transactions/stats')
      .then(response => response.json())
      .then(data => this.setState(data))
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }


  componentDidMount() {
    return this.getStats()
  }


  render() {
    return (
      <section className="App">
        <NavTop />
        <section className="page-container">
          <NavSide />
          <main className="page">
            <header className="page-title">
              {"Transactions"}
            </header>

            <section className="page-content">

              <section className="fun-fact-container">
                <FunFact color="blue" lineAwesomeClassName="la-exchange-alt"
                  label="Total" result={this.state.total} />

                <FunFact color="green" lineAwesomeClassName="la-user-check"
                  label="Approved" result={this.state.approved} />

                <FunFact color="red" lineAwesomeClassName="la-user-times"
                  label="Declined" result={this.state.declined} />

                <FunFact color="orange" lineAwesomeClassName="la-chart-area"
                  label="Approval Rate" result={this.state.approvalRate} isPercentage={true} />
              </section>

              <section className="transaction-log-container">
                <form className="search-form" onSubmit={this.handleSubmit}>
                  <section>
                    <div className="form-control input-with-icon">
                      <input name="transid" type="text" onChange={this.handleChange}
                        placeholder="Search Trans. ID" style={{ width: "272px" }} />
                      <i className="las la-search"></i>
                    </div>
                  </section>
                  <section className="form-row">
                    <article className="form-control">
                      <label className="top">Decision</label>
                      <select name="isapproved" defaultValue="" onChange={this.handleChange}>
                        <option value="">All</option>
                        <option value={true}>Approved</option>
                        <option value={false}>Declined</option>
                      </select>
                    </article>
                    <article className="form-control">
                      <label className="top">Payment</label>
                      <select name="payment" defaultValue="" onChange={this.handleChange}>
                        <option value="">All</option>
                        <option value="visa">Visa</option>
                        <option value="mastercard">Mastercard</option>
                        <option value="amex">Amex</option>
                        <option value="diners">Diners</option>
                      </select>
                    </article>
                    <article className="form-control">
                      <label className="top">Amount</label>
                      <input name="min" type="number" onChange={this.handleChange}
                        placeholder="Min" min="0" step="0.01" style={{ width: "88px" }} />
                    </article>
                    <article className="form-control">
                      <label className="top">&nbsp;</label>
                      <input name="max" type="number" onChange={this.handleChange}
                        placeholder="Max" min="0" step="0.01" style={{ width: "88px" }} />
                    </article>
                    <article className="form-control">
                      <label className="top">BIN Number</label>
                      <input name="bin" type="text" onChange={this.handleChange}
                        placeholder="BIN Num" style={{ width: "88px" }} />
                    </article>
                    <article className="form-control">
                      <label className="top">Email</label>
                      <input name="email" type="email" placeholder="Email" onChange={this.handleChange} />
                    </article>
                    <article className="form-control">
                      <label className="top">&nbsp;</label>
                      <button className="btn blue" type="submit">Search</button>
                    </article>
                    <article className="form-control">
                      <label className="top">&nbsp;</label>
                      <button className="btn white" type="reset">Reset</button>
                    </article>
                  </section>
                </form>

                <section className="search-results">
                  <table>
                    <thead>
                      <tr>
                        <th>Date/Time</th>
                        <th>Name</th>
                        <th>Device</th>
                        <th>Payment</th>
                        <th>BIN Number</th>
                        <th>Amount</th>
                        <th>Trans ID</th>
                        <th>Decision</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.transactions.map((transaction, index) => {
                        return (<tr key={"transaction" + index}>
                          <td>{
                            (() => {
                              var date = new Date(transaction.date);
                              return date.getFullYear() + "-" +
                                String(date.getMonth()).padStart(2, '0') + "-" +
                                String(date.getDate()).padStart(2, '0') + " " +
                                String(date.getHours()).padStart(2, '0') + ":" +
                                String(date.getMinutes()).padStart(2, '0') + ":" +
                                String(date.getSeconds()).padStart(2, '0')
                            })()
                          }</td>
                          <td>{transaction.name}</td>
                          <td>{
                            transaction.ismobile
                              ? <i className={"las la-mobile la-2x"} alt="Mobile" title="Mobile"></i>
                              : <i className={"las la-desktop la-2x"} alt="Desktop" title="Desktop"></i>
                          }</td>
                          <td>{
                            (() => {
                              switch (transaction.payment) {
                                case 'visa':
                                  return <img src="visa.png" alt="Visa" title="Visa" />;
                                case 'mastercard':
                                  return <img src="mastercard.png" alt="Mastercard" title="Mastercard" />;
                                case 'amex':
                                  return <img src="amex.png" alt="Amex" title="Amex" />;
                                case 'diners':
                                  return <img src="diners.png" alt="Diners" title="Diners" />;
                                default:
                                  return null;
                              }
                            })()
                          }</td>
                          <td>{transaction.bin}</td>
                          <td>
                            <NumberFormat
                              value={transaction.amount}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </td>
                          <td>
                            <span title={transaction.transid}>
                              {transaction.transid.substr(0, 10) + "..."}
                            </span>
                          </td>
                          <td>
                            <span className={
                              "bullet " + (transaction.isapproved ? "green" : "red")
                            }>•</span>{transaction.isapproved ? "Approved" : "Declined"}
                          </td>
                        </tr>);
                      })}
                    </tbody>
                  </table>
                </section>

                <section className="form-row pagination">
                  {(() => this.state.pageNum > 0 ? (
                    <article className="form-control">
                      <button onClick={this.previousPage}
                        className="btn white" title="Back">&#60;</button>
                    </article>) : null
                  )()}

                  <article>
                    {this.state.totalResults && (this.state.pageNum * this.state.pageSize + 1)}-{
                      Math.min((this.state.pageNum + 1) * this.state.pageSize, this.state.totalResults)
                    } of {this.state.totalResults}
                  </article>
                  
                  {(() => (this.state.pageNum + 1) < Math.ceil(this.state.totalResults / this.state.pageSize) ? (
                    <article className="form-control">
                      <button onClick={this.nextPage}
                        className="btn white" title="Next">&#62;</button>
                    </article>) : null
                  )()}

                  <article className="form-control">
                    <select name="pageSize" onChange={this.handlePageSizeChange}>
                      <option value={5}>5 / Page</option>
                      <option value={10}>10 / Page</option>
                      <option value={20}>20 / Page</option>
                      <option value={50}>50 / Page</option>
                    </select>
                  </article>
                </section>

              </section>
            </section>
          </main>
        </section>
      </section>
    );
  }
}

export default App;
